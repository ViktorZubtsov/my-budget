# Используем официальный Node.js образ
FROM node:23-alpine AS base

# Устанавливаем зависимости только для production
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl openssl-dev
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Собираем приложение
FROM base AS builder
WORKDIR /app

# Устанавливаем зависимости для сборки
RUN apk add --no-cache libc6-compat openssl openssl-dev

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Устанавливаем dev зависимости для сборки
RUN npm ci

# Генерируем Prisma клиент и собираем приложение
RUN npx prisma generate
RUN DISABLE_ESLINT_PLUGIN=true npm run build

# Production образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Устанавливаем зависимости для runtime
RUN apk add --no-cache libc6-compat openssl

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение
COPY --from=builder /app/public ./public

# Автоматически используем output traces для уменьшения размера образа
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Копируем Prisma схему и сгенерированный клиент
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Копируем entrypoint скрипт
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Устанавливаем netcat для проверки доступности базы данных
RUN apk add --no-cache netcat-openbsd

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Используем entrypoint для запуска миграций и приложения
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
