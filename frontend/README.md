# Quiz Builder — Frontend

UI built with Next.js, TypeScript, Tailwind CSS, React Hook Form, and Zod.

## Tech Stack

- **Next.js 16** — React framework
- **TypeScript**
- **Tailwind CSS** — styling
- **React Hook Form** + **Zod** — form handling and validation

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start the dev server

```bash
npm run dev
```

App runs at `http://localhost:3000`

## Pages

| Route               | Description                  |
| ------------------- | ---------------------------- |
| `/create`           | Create a new quiz            |
| `/quizzes`          | List of all quizzes          |
| `/quizzes/:id`      | Quiz detail view (read-only) |
| `/quizzes/:id/edit` | Edit an existing quiz        |

## Question Types

- **Boolean** — True / False
- **Input** — Short text answer
- **Checkbox** — Multiple choice options (comma-separated)

## Linting & Formatting

```bash
npm run lint
npm run format
```

## Build for Production

```bash
npm run build
npm run start
```
