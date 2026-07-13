# Personal Resume Website

Personal portfolio and resume site built with Next.js, Payload CMS, PostgreSQL, and Docker for Dokploy deployment.

## Stack

- Next.js App Router + TypeScript
- Payload CMS 3 (self-hosted admin at `/admin`)
- PostgreSQL
- Tailwind CSS, Framer Motion, Lucide Icons
- Docker Compose for Dokploy

## Local development

1. Copy environment file:

```bash
cp .env.example .env
```

2. Start PostgreSQL (Docker):

```bash
docker compose up postgres -d
```

Use `127.0.0.1:5433` in `DATABASE_URI` (not `localhost`) on Windows Docker to avoid connection resets.

3. Install dependencies:

```bash
npm install
```

4. Run migrations/seed:

```bash
npm run seed
```

5. Start dev server:

```bash
npm run dev
```

- Public site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

Default admin (change after first login):

- Email: value of `ADMIN_EMAIL` in `.env`
- Password: value of `ADMIN_PASSWORD` in `.env`

## Replace personal details

Update in **Payload Admin → Site Settings**:

| Field | Example placeholder |
| --- | --- |
| Email | `you@example.com` |
| GitHub | `https://github.com/your-username` |
| LinkedIn | `https://www.linkedin.com/in/your-username` |
| Location | `Your City, Country` |
| Resume PDF | Upload in Site Settings → Contact |

Seed content lives in `src/content/seed/data.ts`. After editing, run:

```bash
npm run sync-content
```

## Writing blog posts

1. Go to `/admin` → **Posts** → Create new
2. Add **title**, **excerpt**, and write the article body in the Lexical editor
3. Optionally upload a **cover image** and add **tags**
4. Set **status** to `published` and choose a **publishedAt** date
5. Save — the post appears on `/blog` and in the homepage teaser (latest 3)

Draft posts stay hidden from the public site until published.

## Upload project images

1. Go to `/admin`
2. Open **Projects**
3. Edit a project
4. Upload **Cover image** or add gallery images in **Media**

## Contact form (SMTP)

Set in `.env` or Dokploy environment:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-app-password
SMTP_FROM=you@example.com
CONTACT_NOTIFY_EMAIL=you@example.com
```

Submissions are stored in **Contact Submissions** in admin and emailed to you.

## Dokploy deployment

1. Push repo to GitHub
2. Create Dokploy application from Docker Compose
3. Set environment variables from `.env.example`
4. Attach persistent volumes for `postgres_data` and `media_data`
5. Deploy and run seed once:

```bash
npm run seed
```

6. Point domain through Cloudflare (optional) and set `NEXT_PUBLIC_SITE_URL`

## Content management

All public content is editable in Payload admin:

- Site Settings (hero, about, philosophy, stack, SEO, map locations)
- Metrics, Experience, Projects, Posts, Education, Certifications, Capabilities
- Media library for images and resume PDF

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run seed` | Seed CMS content from `src/content/seed/data.ts` |
| `npm run sync-content` | Sync seed content updates into Payload |

## Design

- Apple-neutral palette with amber accent
- First-person intro-first narrative with scroll-reveal sections
- Dark/light mode toggle
- Printable resume mode via browser print (`Ctrl+P`)

## Files kept local (not in git)

Personal resume files, `workflow.md`, and `docs/` are listed in `.gitignore` and should stay on your machine only.
