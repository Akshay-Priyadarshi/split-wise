# Split-Wise (Motia Backend)

A backend project built with [Motia](https://www.motia.dev/), supporting API endpoints, event-driven workflows, and database operations for expense management.

## Project Structure

```
steps/           # Workflow steps (API, event, cron, noop)
schemas/         # Zod schemas for validation
services/        # Business logic and DB access
db/              # Drizzle ORM setup and schema
```

## Getting Started

1. **Install dependencies:**
	```sh
	npm install
	```

2. **Run development server:**
	```sh
	npm run dev
	```

3. **Build project:**
	```sh
	npm run build
	```

## API Endpoints

Defined in [`steps/apis`](steps/apis):

- `GET /users/:id` – Read user info
- `POST /users` – Create user
- `GET /expenses/:id` – Read expense
- `POST /expenses` – Create expense
- `GET /expense-categories/:id` – Read expense category
- `POST /expense-categories` – Create expense category

## Testing

See [`.cursor/rules/testing.mdc`](.cursor/rules/testing.mdc) for Motia step testing guidelines.

## Database

Configured via Drizzle ORM in [`db/`](db/).

## Learn More

- [Motia Documentation](https://www.motia.dev/docs/)
- [Drizzle ORM](https://orm.drizzle.team/)

---

> For workflow changes, modify files in [`steps/`](steps/).
