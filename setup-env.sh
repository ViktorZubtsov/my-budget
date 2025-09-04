#!/bin/bash

# Скрипт для создания .env файла из env.example

if [ ! -f .env ]; then
    echo "Создаю .env файл из env.example..."
    cp env.example .env
    echo "✅ .env файл создан!"
    echo ""
    echo "📝 Не забудьте отредактировать .env файл с вашими настройками:"
    echo "   - Измените пароли базы данных"
    echo "   - Настройте Google OAuth credentials"
    echo "   - Обновите NEXTAUTH_SECRET"
    echo ""
    echo "🔧 Для редактирования: nano .env"
else
    echo "⚠️  .env файл уже существует!"
    echo "   Если хотите пересоздать, удалите его и запустите скрипт снова:"
    echo "   rm .env && ./setup-env.sh"
fi
