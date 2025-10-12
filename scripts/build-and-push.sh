#!/bin/bash

# Скрипт для безопасной сборки и публикации Docker образа
# Использование: ./scripts/build-and-push.sh [registry] [tag]

set -e  # Выход при любой ошибке

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверяем наличие .env файла
if [ ! -f ".env" ]; then
    error ".env файл не найден! Создайте его на основе env.example"
    exit 1
fi

# Загружаем переменные окружения
source .env

# Параметры по умолчанию
REGISTRY=${1:-"docker.io"}
IMAGE_NAME=${DOCKER_IMAGE_NAME:-"my-budget-app"}
TAG=${2:-"latest"}

# Полное имя образа
FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"

log "Начинаем сборку Docker образа..."
log "Registry: ${REGISTRY}"
log "Image: ${IMAGE_NAME}"
log "Tag: ${TAG}"
log "Full name: ${FULL_IMAGE_NAME}"

# Проверяем, что мы не случайно не включили .env в образ
log "Проверяем .dockerignore..."
if grep -q "\.env" .dockerignore; then
    success ".env файл исключен из образа"
else
    error ".env файл НЕ исключен из образа! Проверьте .dockerignore"
    exit 1
fi

# Собираем образ
log "Собираем Docker образ..."
docker build -f Dockerfile.prod -t "${FULL_IMAGE_NAME}" .

# Проверяем размер образа
IMAGE_SIZE=$(docker images --format "table {{.Size}}" "${FULL_IMAGE_NAME}" | tail -n 1)
log "Размер образа: ${IMAGE_SIZE}"

# Проверяем, что в образе нет .env файлов
log "Проверяем содержимое образа на наличие .env файлов..."
if docker run --rm "${FULL_IMAGE_NAME}" find / -name ".env*" 2>/dev/null | grep -q ".env"; then
    error "В образе найдены .env файлы! Проверьте .dockerignore"
    exit 1
else
    success "В образе нет .env файлов"
fi

# Проверяем, что в образе нет секретов
log "Проверяем образ на наличие потенциальных секретов..."
SECRETS_FOUND=false

# Проверяем на наличие паролей, ключей и токенов
if docker run --rm "${FULL_IMAGE_NAME}" find / -type f -exec grep -l "password\|secret\|key\|token" {} \; 2>/dev/null | grep -v "/proc/" | grep -v "/sys/" | head -5; then
    warning "Найдены файлы с потенциальными секретами. Проверьте их содержимое."
    SECRETS_FOUND=true
fi

if [ "$SECRETS_FOUND" = true ]; then
    warning "Рекомендуется проверить содержимое найденных файлов перед публикацией"
    read -p "Продолжить публикацию? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log "Публикация отменена"
        exit 1
    fi
fi

# Тегируем образ как latest если тег не latest
if [ "$TAG" != "latest" ]; then
    LATEST_TAG="${REGISTRY}/${IMAGE_NAME}:latest"
    log "Тегируем образ как latest: ${LATEST_TAG}"
    docker tag "${FULL_IMAGE_NAME}" "${LATEST_TAG}"
fi

# Публикуем образ
log "Публикуем образ в registry..."
docker push "${FULL_IMAGE_NAME}"

if [ "$TAG" != "latest" ]; then
    docker push "${LATEST_TAG}"
fi

success "Образ успешно опубликован!"
success "Имя образа: ${FULL_IMAGE_NAME}"

# Выводим инструкции по использованию
echo
log "Для запуска в production используйте:"
echo "  docker-compose -f docker-compose.prod.yml up -d"
echo
log "Убедитесь, что на сервере есть .env файл с правильными переменными окружения!"
echo
log "Для проверки безопасности образа:"
echo "  docker run --rm ${FULL_IMAGE_NAME} env | grep -E '(PASSWORD|SECRET|KEY|TOKEN)'"
echo
success "Готово!"
