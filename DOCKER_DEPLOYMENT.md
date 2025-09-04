# Docker Deployment Guide

Этот документ содержит инструкции по развертыванию приложения My Budget с использованием Docker.

## Предварительные требования

- Docker
- Docker Compose

## Быстрый старт

1. **Клонируйте репозиторий и перейдите в директорию проекта:**
   ```bash
   cd my-budget
   ```

2. **Создайте файл `.env` с переменными окружения:**
   ```bash
   # Автоматически создать .env из примера
   chmod +x setup-env.sh
   ./setup-env.sh
   
   # Или вручную
   cp env.example .env
   ```
   
   Обновите следующие переменные в `.env`:
   ```env
   # База данных
   MYSQL_ROOT_PASSWORD=your-secure-password
   MYSQL_PASSWORD=your-secure-password
   
   # Приложение
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_SECRET=your-google-secret
   ```

3. **Запустите все сервисы:**
   ```bash
   docker-compose up -d
   ```

4. **Проверьте статус сервисов:**
   ```bash
   docker-compose ps
   ```

## Доступ к приложению

- **Приложение:** http://localhost:3000
- **PHPMyAdmin:** http://localhost:7070
- **База данных:** localhost:3306 (dev), localhost:3307 (dev_shadow)

## Полезные команды

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f app
docker-compose logs -f db1
```

### Перезапуск сервисов
```bash
# Перезапуск приложения
docker-compose restart app

# Перезапуск всех сервисов
docker-compose restart
```

### Выполнение команд в контейнере
```bash
# Подключение к контейнеру приложения
docker-compose exec app sh

# Выполнение Prisma команд
docker-compose exec app npx prisma studio
docker-compose exec app npx prisma migrate dev
```

### Остановка и очистка
```bash
# Остановка всех сервисов
docker-compose down

# Остановка с удалением volumes (ВНИМАНИЕ: удалит все данные!)
docker-compose down -v
```

## Структура Docker файлов

- `Dockerfile` - основной файл для сборки образа приложения
- `docker-compose.yml` - конфигурация для запуска всех сервисов
- `docker-entrypoint.sh` - скрипт для инициализации приложения
- `.dockerignore` - файлы, исключаемые из контекста сборки

## Переменные окружения

### Обязательные переменные:
- `MYSQL_URL` - URL основной базы данных
- `MYSQL_URL_SHADOW` - URL shadow базы данных для Prisma
- `NEXTAUTH_URL` - URL приложения для NextAuth
- `NEXTAUTH_SECRET` - секретный ключ для NextAuth

### Опциональные переменные:
- `NODE_ENV` - окружение (production/development)
- `PORT` - порт приложения (по умолчанию 3000)

## Troubleshooting

### Проблемы с подключением к базе данных
1. Убедитесь, что базы данных запущены: `docker-compose ps`
2. Проверьте логи базы данных: `docker-compose logs db1`
3. Убедитесь, что переменные окружения корректны

### Проблемы с миграциями
1. Проверьте логи приложения: `docker-compose logs app`
2. Выполните миграции вручную: `docker-compose exec app npx prisma migrate deploy`

### Проблемы со сборкой
1. Очистите Docker кэш: `docker system prune -a`
2. Пересоберите образ: `docker-compose build --no-cache app`

## Production Deployment

Для production развертывания:

1. **Обновите переменные окружения:**
   - Измените `NEXTAUTH_URL` на ваш домен
   - Установите надежный `NEXTAUTH_SECRET`
   - Настройте SSL/TLS

2. **Используйте внешнюю базу данных:**
   - Обновите `MYSQL_URL` и `MYSQL_URL_SHADOW`
   - Удалите сервисы `db1` и `db2` из docker-compose.yml

3. **Настройте reverse proxy (nginx/traefik):**
   - Добавьте SSL сертификаты
   - Настройте домены

4. **Мониторинг:**
   - Настройте логирование
   - Добавьте health checks
   - Настройте мониторинг ресурсов
