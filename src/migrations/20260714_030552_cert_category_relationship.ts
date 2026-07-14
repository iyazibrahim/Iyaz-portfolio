import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

import { seedData } from '../content/seed/data'

/**
 * Converts certification.category from a fixed enum to a reusable
 * relationship against certification_categories, and seeds the three
 * legacy categories so existing rows keep their assignments.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // 1. Create the new categories table (no FK yet).
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "certification_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "certification_categories_name_idx"
      ON "certification_categories" USING btree ("name");
    CREATE INDEX IF NOT EXISTS "certification_categories_updated_at_idx"
      ON "certification_categories" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "certification_categories_created_at_idx"
      ON "certification_categories" USING btree ("created_at");
  `)

  // 2. Seed the three legacy categories (idempotent).
  await db.execute(sql`
    INSERT INTO "certification_categories" ("name")
    VALUES ('Networking'), ('Cybersecurity'), ('AV and Technical')
    ON CONFLICT ("name") DO NOTHING;
  `)

  // 3. Add nullable category_id so we can backfill existing rows.
  await db.execute(sql`
    ALTER TABLE "certifications"
      ADD COLUMN IF NOT EXISTS "category_id" integer;
  `)

  // 4. Map old enum (or free-text) values → category ids.
  await db.execute(sql`
    UPDATE "certifications" AS c
    SET "category_id" = cc.id
    FROM "certification_categories" AS cc
    WHERE c."category_id" IS NULL
      AND (
        (c."category"::text IN ('networking', 'Networking') AND cc."name" = 'Networking')
        OR (c."category"::text IN ('cybersecurity', 'Cybersecurity') AND cc."name" = 'Cybersecurity')
        OR (c."category"::text IN ('av', 'AV and Technical') AND cc."name" = 'AV and Technical')
      );
  `)

  // Any leftover unmatched rows fall back to Networking so NOT NULL can apply.
  await db.execute(sql`
    UPDATE "certifications"
    SET "category_id" = (
      SELECT "id" FROM "certification_categories" WHERE "name" = 'Networking' LIMIT 1
    )
    WHERE "category_id" IS NULL;
  `)

  // 5. Enforce NOT NULL now that every row has a value.
  await db.execute(sql`
    ALTER TABLE "certifications"
      ALTER COLUMN "category_id" SET NOT NULL;
  `)

  // 6. Drop the old enum column (and type) if still present.
  await db.execute(sql`
    ALTER TABLE "certifications" DROP COLUMN IF EXISTS "category";
    DROP TYPE IF EXISTS "public"."enum_certifications_category";
  `)

  // 7. Foreign keys + indexes for the new relationship.
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "certifications"
        ADD CONSTRAINT "certifications_category_id_certification_categories_id_fk"
        FOREIGN KEY ("category_id")
        REFERENCES "public"."certification_categories"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "certifications_category_idx"
      ON "certifications" USING btree ("category_id");
  `)

  // 8. Payload locked-documents join column for the new collection.
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "certification_categories_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_certification_categories_fk"
        FOREIGN KEY ("certification_categories_id")
        REFERENCES "public"."certification_categories"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_certification_categories_i_idx"
      ON "payload_locked_documents_rels" USING btree ("certification_categories_id");
  `)

  // 9. Seed certifications if the earlier seed migration left the table empty
  //    (fresh installs: seed_content skips certifications because the schema
  //    has already moved to a relationship by the time Payload creates them).
  const existingCerts = await payload.find({
    collection: 'certifications',
    limit: 1,
    req,
  })

  if (existingCerts.totalDocs === 0) {
    const categories = await payload.find({
      collection: 'certification-categories',
      limit: 50,
      req,
    })
    const byName = Object.fromEntries(
      categories.docs.map((c) => [c.name, c.id]),
    ) as Record<string, number>

    const slugToName: Record<string, string> = {
      networking: 'Networking',
      cybersecurity: 'Cybersecurity',
      av: 'AV and Technical',
    }

    for (const item of seedData.certifications) {
      const name = slugToName[item.category] || item.category
      const categoryId = byName[name]
      if (!categoryId) continue

      await payload.create({
        collection: 'certifications',
        data: {
          title: item.title,
          category: categoryId,
          sort: item.sort,
        } as never,
        req,
      })
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_certifications_category"
      AS ENUM('networking', 'cybersecurity', 'av');

    ALTER TABLE "certifications"
      ADD COLUMN IF NOT EXISTS "category" "enum_certifications_category";

    UPDATE "certifications" AS c
    SET "category" = CASE cc."name"
      WHEN 'Networking' THEN 'networking'::"enum_certifications_category"
      WHEN 'Cybersecurity' THEN 'cybersecurity'::"enum_certifications_category"
      WHEN 'AV and Technical' THEN 'av'::"enum_certifications_category"
      ELSE 'networking'::"enum_certifications_category"
    END
    FROM "certification_categories" AS cc
    WHERE c."category_id" = cc."id";

    ALTER TABLE "certifications"
      ALTER COLUMN "category" SET NOT NULL;

    ALTER TABLE "certifications"
      DROP CONSTRAINT IF EXISTS "certifications_category_id_certification_categories_id_fk";
    DROP INDEX IF EXISTS "certifications_category_idx";
    ALTER TABLE "certifications" DROP COLUMN IF EXISTS "category_id";

    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_certification_categories_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_certification_categories_i_idx";
    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "certification_categories_id";

    DROP TABLE IF EXISTS "certification_categories" CASCADE;
  `)
}
