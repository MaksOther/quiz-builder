# Quiz Builder — Backend

REST API built with NestJS, TypeScript, and Prisma.

## Tech Stack

- **NestJS** — Node.js framework
- **TypeScript**
- **Prisma** — ORM
- **PostgreSQL** (or SQLite for local dev)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/quizdb
PORT=3001
```

> For SQLite use: `DATABASE_URL=file:./dev.db`

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 4. Start the server

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Server runs at `http://localhost:3001`

## API Endpoints

| Method   | Endpoint       | Description       |
| -------- | -------------- | ----------------- |
| `POST`   | `/quizzes`     | Create a new quiz |
| `GET`    | `/quizzes`     | List all quizzes  |
| `GET`    | `/quizzes/:id` | Get quiz details  |
| `PUT`    | `/quizzes/:id` | Update a quiz     |
| `DELETE` | `/quizzes/:id` | Delete a quiz     |

## Example Request

**Create a quiz:**

```bash
curl -X POST http://localhost:3001/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "General Knowledge",
    "questions": [
      { "text": "Is the Earth round?", "type": "boolean" },
      { "text": "What is the capital of France?", "type": "input" },
      {
        "text": "Which are primary colors?",
        "type": "checkbox",
        "options": ["Red", "Green", "Blue", "Yellow"]
      }
    ]
  }'
```

## Linting & Formatting

```bash
npm run lint
npm run format
```
