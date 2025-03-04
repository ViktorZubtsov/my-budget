

<div>
<h1 align="center">My Budget <img src="./public/logo.svg" height="76"/>
<img src="https://github.com/blackcater/blackcater/raw/main/images/Hi.gif" height="32"/></h1>
</div>
<h2 align="center">Это приложение для планирования бюджета</h2>

| Прод        |         https://my-budget-space.vercel.app/                                                                                                        |
|-------------| ------------------------------------------------------------------------------------------------------------------- |
| StoryBook   | https://65dddade323aed28d6d7f21d-qkjenvxeqb.chromatic.com/?path=/story/components-addbutton--add-button-story       |

| Package                                                                                                       | Version                                                                                                              |
|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)       |    20        |
| ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)           | 10.2.4 |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | 18.2.0 |
| ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)          | 14.1.4 |
| ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)         | 5.12.1 |
| ![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)       | 1.4.0 |

<h2>Как развернуть проект локально</h2>

### Установка зависимостей
```
    npm i
```

### Поднять базу данных
```
    docker compose up -d
```

### Создайте окружение.
Создайе файл `.env` и скопируйте туда значения из `.env.example`

### Создайте миграцию бд.
```
    npm run migrate:dev
```

### Сделать миграцию бд.
```
    npm run migrate:dev
```

### Запустите локальный сервер.
```
    npm run dev
```

### Готово :`)

<h2 >Demo:</h3>
<h3 >Авторизация</h4>
<img src="./dock/auth.gif" height="740"/></h1>
<h3 >Добавление цели</h4>
<img src="./dock/AddGoal.gif" height="740"/></h1>
<h3 >Отметить задачу выполненно</h4>
<img src="./dock/CheckTask.gif" height="740"/></h1>
<h3 >Прочий функционал</h4>
<img src="./dock/Other.gif" height="740"/></h1>
<img src="./dock/Other2.gif" height="740"/></h1>

<h2>Дополнительно</h2>

### Запустить unit тесты 
```
    npm run test
```

### Запустить скриншотные тесты 
```
    npm run storybook
```
```
    npm run loki:test
```

### Запустить e2e тесты 
```
    npx cypress run
```