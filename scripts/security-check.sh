#!/bin/bash

# Скрипт для проверки безопасности Docker образа
# Использование: ./scripts/security-check.sh [image_name]

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Параметры
IMAGE_NAME=${1:-"my-budget-app:latest"}

log "Проверяем безопасность образа: ${IMAGE_NAME}"

# Проверяем, что образ существует
if ! docker image inspect "${IMAGE_NAME}" >/dev/null 2>&1; then
    error "Образ ${IMAGE_NAME} не найден!"
    exit 1
fi

# 1. Проверяем переменные окружения
log "1. Проверяем переменные окружения..."
ENV_VARS=$(docker run --rm "${IMAGE_NAME}" env 2>/dev/null || echo "")
SENSITIVE_VARS=$(echo "${ENV_VARS}" | grep -iE "(password|secret|key|token|auth)" || echo "")

if [ -n "${SENSITIVE_VARS}" ]; then
    warning "Найдены потенциально чувствительные переменные окружения:"
    echo "${SENSITIVE_VARS}"
else
    success "Чувствительные переменные окружения не найдены"
fi

# 2. Проверяем наличие .env файлов
log "2. Проверяем наличие .env файлов..."
ENV_FILES=$(docker run --rm "${IMAGE_NAME}" find / -name ".env*" 2>/dev/null || echo "")

if [ -n "${ENV_FILES}" ]; then
    error "Найдены .env файлы в образе:"
    echo "${ENV_FILES}"
else
    success ".env файлы не найдены в образе"
fi

# 3. Проверяем наличие файлов с секретами
log "3. Проверяем файлы с потенциальными секретами..."
SECRET_FILES=$(docker run --rm "${IMAGE_NAME}" find / -type f -name "*.key" -o -name "*.pem" -o -name "*.p12" -o -name "*.pfx" 2>/dev/null || echo "")

if [ -n "${SECRET_FILES}" ]; then
    warning "Найдены файлы с потенциальными секретами:"
    echo "${SECRET_FILES}"
else
    success "Файлы с секретами не найдены"
fi

# 4. Проверяем содержимое файлов на наличие секретов
log "4. Проверяем содержимое файлов на наличие секретов..."
SECRET_CONTENT=$(docker run --rm "${IMAGE_NAME}" find / -type f -exec grep -l "password\|secret\|key\|token" {} \; 2>/dev/null | grep -v "/proc/" | grep -v "/sys/" | head -10 || echo "")

if [ -n "${SECRET_CONTENT}" ]; then
    warning "Найдены файлы с потенциальными секретами в содержимом:"
    echo "${SECRET_CONTENT}"
    
    # Показываем примеры найденного содержимого
    log "Примеры найденного содержимого:"
    for file in $(echo "${SECRET_CONTENT}" | head -3); do
        echo "--- ${file} ---"
        docker run --rm "${IMAGE_NAME}" grep -iE "(password|secret|key|token)" "${file}" 2>/dev/null | head -2 || echo "Не удалось прочитать файл"
        echo
    done
else
    success "Секреты в содержимом файлов не найдены"
fi

# 5. Проверяем размер образа
log "5. Проверяем размер образа..."
IMAGE_SIZE=$(docker images --format "table {{.Size}}" "${IMAGE_NAME}" | tail -n 1)
log "Размер образа: ${IMAGE_SIZE}"

# 6. Проверяем пользователя
log "6. Проверяем пользователя для запуска..."
USER_INFO=$(docker run --rm "${IMAGE_NAME}" whoami 2>/dev/null || echo "unknown")
if [ "${USER_INFO}" = "root" ]; then
    warning "Приложение запускается от имени root пользователя"
else
    success "Приложение запускается от имени пользователя: ${USER_INFO}"
fi

# 7. Проверяем открытые порты
log "7. Проверяем открытые порты..."
EXPOSED_PORTS=$(docker image inspect "${IMAGE_NAME}" --format='{{range $p, $conf := .Config.ExposedPorts}}{{$p}} {{end}}' 2>/dev/null || echo "")
if [ -n "${EXPOSED_PORTS}" ]; then
    log "Открытые порты: ${EXPOSED_PORTS}"
else
    log "Открытые порты не найдены"
fi

# 8. Проверяем метаданные образа
log "8. Проверяем метаданные образа..."
CREATED=$(docker image inspect "${IMAGE_NAME}" --format='{{.Created}}' 2>/dev/null || echo "unknown")
SIZE=$(docker image inspect "${IMAGE_NAME}" --format='{{.Size}}' 2>/dev/null || echo "unknown")
log "Создан: ${CREATED}"
log "Размер в байтах: ${SIZE}"

echo
log "Проверка безопасности завершена!"
echo
log "Рекомендации:"
echo "1. Убедитесь, что все секреты передаются через переменные окружения"
echo "2. Используйте .dockerignore для исключения чувствительных файлов"
echo "3. Запускайте приложение от непривилегированного пользователя"
echo "4. Регулярно обновляйте базовые образы для исправления уязвимостей"
