# Cariir API

Restful API backend service for Cariir, providing features including CV parsing, job scraping orchestration, and job recommendations. Built using Node.js, Express, and PostgreSQL (via Sequelize ORM).

## Features

- **User Authentication**: Secure routes and role-based access.
- **RESTful Endpoints**: Dynamically scales with controllers placed in the `routes/` directory.
- **Database ORM**: Managed via Sequelize with PostgreSQL dialect.
- **CV Analysis & Job Scraping Workflow**: Integration ready with N8N and Scraper Workers (Details mapped out in `SYSTEM_DESIGN.md`).

## Prerequisites

- Node.js (v22.x recommended)
- PostgreSQL

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd cariir-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the Environment:**
   Ensure you have a `.env.development` file containing (at least):

   ```env.development
   PORT=3000
   SERVICE_NAME=Cariir API
   JSON_LIMIT=10mb
   # Database connection credentials for Sequelize...
   ```

4. **Initialize Database:**
   Ensure your local PostgreSQL database is ready, then run the migrations and seeders:
   ```bash
   npm run migrate
   npm run seed
   ```

## Development & Usage Scripts

This API utilizes `npm` scripts as defined in `package.json`:

- `npm run dev`: Starts the application in development mode with live reloading (via nodemon).
- `npm start`: Starts the standard Node environment.
- `npm test`: Runs the automated test suite using **Vitest**.
- `npm run migrate`: Applies new Sequelize migrations.
- `npm run seed`: Seeds the database with initial role/user tables.
- `npm run migrate:undo`: Rolls back the last applied migration.
- `npm run seed:undo`: Rolls back seed data.

## Project Structure (Core)

- `/app.js`: Main entry point configuring Express server, CORS, body parsers, and auto-mapping API routes.
- `/routes/`: Express router files. Each `[name].js` becomes the `/[name]` endpoint.
- `/controllers/`: Core business logic serving the routes (e.g., `userController` and `roleController`).
- `/models/`: Sequelize models defining schema entities.
- `/tests/`: Vitest testing suite.
- `SYSTEM_DESIGN.md`: Deep dive into system integrations and data workflow architectures.
