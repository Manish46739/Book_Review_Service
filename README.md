# 📚 Book Review Service

A backend API built with NestJS, MongoDB, and Redis for managing books and their reviews. Includes caching, validation, and Swagger API documentation.

---

## Features

- **Books CRUD**: Add and list books
- **Reviews**: Add and list reviews for books
- **Caching**: Redis cache for book list endpoint
- **Validation**: Prevents duplicate reviews by the same person for the same book
- **Swagger UI**: API documentation and testing at `/api`
- **Environment Variables**: Configurable MongoDB and Redis URLs

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (running on `localhost:27017` by default)
- [Redis](https://redis.io/) (running on `localhost:6379` by default)
- (Optional) [MongoDB Compass](https://www.mongodb.com/products/compass) for DB GUI

---

## Getting Started

### 1. Clone the Repository

```bash
# Replace with your path if needed
git clone <your-repo-url>
cd book-review-service-final
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
MONGO_URL=mongodb://localhost:27017/book_review
REDIS_URL=redis://localhost:6379
```

### 4. Start MongoDB and Redis

Ensure both services are running locally. Example for Windows:

```powershell
net start MongoDB
net start Redis
```

Or use Docker:

```bash
docker run -d --name mongo -p 27017:27017 mongo
docker run -d --name redis -p 6379:6379 redis
```

### 5. Run the Application

```bash
npm run start:dev
```

Or for production:

```bash
npm run start
```

---

## API Documentation

Visit [http://localhost:3000/api](http://localhost:3000/api) for Swagger UI. You can test all endpoints directly from the browser.

---

## Endpoints

### Books

- `GET /books` — List all books (cached)
- `POST /books` — Add a new book

### Reviews

- `GET /books/:id/reviews` — List all reviews for a book
- `POST /books/:id/reviews` — Add a review for a book
  - **Note:** The same reviewer cannot review the same book more than once.

---

## Bulk Add Books (Script)

A PowerShell script `add-books.ps1` is provided to quickly add 10 sample books:

1. Ensure the server is running (`npm run start:dev`).
2. In PowerShell, run:
   ```powershell
   .\add-books.ps1
   ```
3. You should see output confirming each book was added.

---

## Caching Details

- The `/books` GET endpoint is cached in Redis for 60 seconds.
- Adding a new book clears the cache.
- If Redis is offline, the app will still work (cache is bypassed).

---

## Error Handling

- If a reviewer tries to review the same book twice, an error is returned.
- If MongoDB or Redis are unavailable, the app logs a warning and continues where possible.

---

## Project Structure

```
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── books/
│   │   ├── books.controller.ts
│   │   ├── books.module.ts
│   │   ├── books.service.ts
│   │   ├── dto/
│   │   │   └── create-book.dto.ts
│   │   └── schemas/
│   │       └── book.schema.ts
│   ├── reviews/
│   │   ├── reviews.controller.ts
│   │   ├── reviews.module.ts
│   │   ├── reviews.service.ts
│   │   ├── dto/
│   │   │   └── create-review.dto.ts
│   │   └── schemas/
│   │       └── review.schema.ts
│   └── cache/
│       ├── cache.module.ts
│       ├── cache.service.ts
│       └── prompt.md
├── add-books.ps1
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
├── .gitattributes
└── README.md
```

---

## Troubleshooting

- **Books not appearing after script:**
  - Check server logs for errors.
  - Ensure MongoDB and Redis are running.
  - Try clearing the Redis cache or restarting the server.
- **Validation errors:**
  - Ensure required fields are present in requests.
- **Port conflicts:**
  - Change the port in `main.ts` if needed.

---

## License

MIT
