#!/bin/sh

# Ждем пока база данных будет готова
echo "Waiting for database to be ready..."
while ! nc -z db1 3306; do
  sleep 1
done

echo "Database is ready!"

# Запускаем миграции Prisma
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Запускаем приложение
echo "Starting application..."
exec "$@"
