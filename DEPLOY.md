# 🚀 Деплой на Vercel

## Быстрый старт

### Способ 1: Через Vercel CLI (рекомендуется)

1. **Установите Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Залогиньтесь в Vercel:**
   ```bash
   vercel login
   ```

3. **Задеплойте проект:**
   ```bash
   vercel
   ```
   
   Или используйте скрипт из package.json:
   ```bash
   npm run deploy
   ```

4. **Для продакшн-деплоя:**
   ```bash
   vercel --prod
   ```

### Способ 2: Через GitHub + Vercel (автоматический деплой)

1. **Запушьте проект в GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/web-shop.git
   git push -u origin main
   ```

2. **Подключите репозиторий на Vercel:**
   - Перейдите на [vercel.com](https://vercel.com)
   - Нажмите "Add New Project"
   - Импортируйте ваш GitHub репозиторий
   - Нажмите "Deploy"

3. **Автоматический деплой:**
   - Теперь при каждом пуше в ветку `main` проект будет автоматически деплоиться

## Настройки Vercel

Проект уже содержит файл `vercel.json` с необходимыми настройками:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "installCommand": "npm install",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Что делают настройки:

- **buildCommand** — команда для сборки проекта
- **outputDirectory** — папка с билдом
- **rewrites** — перенаправление всех маршрутов на index.html (для React Router)

## Переменные окружения

Если нужны переменные окружения:

1. **Через Vercel Dashboard:**
   - Project Settings → Environment Variables
   - Добавьте переменные (например, API_URL)

2. **Через .env файл:**
   ```bash
   # Создайте файл .env.production
   REACT_APP_API_URL=https://api.example.com
   ```

## Полезные команды

| Команда | Описание |
|---------|----------|
| `vercel` | Деплой в development |
| `vercel --prod` | Деплой в production |
| `vercel ls` | Список проектов |
| `vercel rm <deployment>` | Удалить деплой |
| `vercel env pull` | Скачать переменные окружения |

## Ссылки

- [Документация Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Create React App на Vercel](https://vercel.com/guides/deploying-react-with-vercel)
