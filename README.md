# Quiz Builder

A full-stack quiz creation platform built with NestJS and Next.js.

## Project Structure

```
quiz-builder/
├── backend/     # NestJS REST API
├── frontend/    # Next.js UI
└── README.md
```

## Tech Stack

**Backend:** NestJS · TypeScript · Prisma · PostgreSQL  
**Frontend:** Next.js · TypeScript · Tailwind CSS · React Hook Form · Zod

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/MaksOther/quiz-builder.git
cd quiz-builder
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/quizdb
PORT=3001
```

Run migrations and start:

```bash
npx prisma migrate dev --name init
npm run start:dev
```

API runs at `http://localhost:3001`

### 3. Set up the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the dev server:

```bash
npm run dev
```

App runs at `http://localhost:3000`

## API Endpoints

| Method   | Endpoint       | Description      |
| -------- | -------------- | ---------------- |
| `POST`   | `/quizzes`     | Create a quiz    |
| `GET`    | `/quizzes`     | List all quizzes |
| `GET`    | `/quizzes/:id` | Get quiz details |
| `PUT`    | `/quizzes/:id` | Update a quiz    |
| `DELETE` | `/quizzes/:id` | Delete a quiz    |

## Pages

| Route               | Description           |
| ------------------- | --------------------- |
| `/create`           | Create a new quiz     |
| `/quizzes`          | All quizzes dashboard |
| `/quizzes/:id`      | Quiz detail view      |
| `/quizzes/:id/edit` | Edit a quiz           |

```
