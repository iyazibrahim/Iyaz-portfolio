import * as migration_20260714_001104_initial_schema from './20260714_001104_initial_schema';
import * as migration_20260714_001105_seed_content from './20260714_001105_seed_content';
import * as migration_20260714_030552_cert_category_relationship from './20260714_030552_cert_category_relationship';

export const migrations = [
  {
    up: migration_20260714_001104_initial_schema.up,
    down: migration_20260714_001104_initial_schema.down,
    name: '20260714_001104_initial_schema',
  },
  {
    up: migration_20260714_001105_seed_content.up,
    down: migration_20260714_001105_seed_content.down,
    name: '20260714_001105_seed_content',
  },
  {
    up: migration_20260714_030552_cert_category_relationship.up,
    down: migration_20260714_030552_cert_category_relationship.down,
    name: '20260714_030552_cert_category_relationship'
  },
];
