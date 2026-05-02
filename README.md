# Photo Course

Монорепо: `backend/` (NestJS + TypeORM + Postgres) и `frontend/` (Vite + React).

## Бесплатный деплой

Связка: **Neon (Postgres) + Render (бэк) + Vercel (фронт)**.

Почему именно так:
- **Neon** — бесплатный serverless Postgres, не удаляется через 90 дней (в отличие от free Postgres у Render).
- **Render** — бесплатный Web Service для Node, без карты. Засыпает после ~15 мин простоя — первый запрос будит сервис.
- **Vercel** — лучший бесплатный вариант для Vite/React, мгновенные деплои из git.

### 1. Postgres на Neon

1. Регистрируемся на https://neon.tech, создаём проект.
2. Копируем connection string вида `postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require`.

### 2. Бэк на Render

1. https://render.com → New → Web Service → подключаем репозиторий.
2. Render подхватит `backend/render.yaml`. Если делаем вручную:
   - Root Directory: `backend`
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm run start:prod`
3. Environment:
   - `DATABASE_URL` = строка из Neon
   - `SWAGGER_LOGIN`, `SWAGGER_PASS` (опционально)
4. После деплоя URL вида `https://photo-course-api.onrender.com`. Проверка: `/api/v1/...`, Swagger: `/docs/api`.

При первом старте `synchronize: true` сам создаст таблицы по сущностям. Перед продом стоит выключить и перейти на миграции.

### 3. Фронт на Vercel

1. https://vercel.com → New Project → импортируем репозиторий.
2. Root Directory: `frontend` (Vercel сам определит Vite).
3. Environment Variables:
   - `VITE_API_URL` = `https://photo-course-api.onrender.com/api/v1`
4. Deploy. SPA-роутинг настроен через `frontend/vercel.json`.

## Локальный запуск

```bash
# backend
cd backend
cp .env.example .env   # заполнить
npm install
npm run start:dev

# frontend (в другом терминале)
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Что подготовлено в этой ревизии

- `backend/src/main.ts` — порт берётся из `PORT` (Render задаёт его сам).
- `backend/src/infra/postgres/typeorm.config.ts` — поддержка `DATABASE_URL` и SSL для облачного Postgres.
- `backend/src/shared/swagger/swagger-initializer.ts` — basic-auth у Swagger стал опциональным.
- `backend/.env.example`, `backend/render.yaml`, `backend/.nvmrc`.
- `frontend/vite.config.js` — починен (server-секция была ошибочно вложена в `react()`).
- `frontend/.env.example`, `frontend/vercel.json`, `frontend/.nvmrc`.
- `frontend/.gitignore` — игнор `.env*` кроме `.env.example`.
