FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
# Prefer a reproducible install; fall back to npm install if the lockfile
# is out of sync so deployments never hard-fail on lockfile drift.
RUN npm ci || (echo "Lockfile out of sync, running npm install" && npm install)

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# media holds runtime uploads (mounted as a volume in production) and public
# holds static assets; ensure both dirs exist so the runner stage copies never
# hard-fail when the repo doesn't ship them.
RUN mkdir -p media public
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/media ./media

RUN chown -R nextjs:nodejs /app/media

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
