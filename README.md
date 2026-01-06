# REST API - Library

REST API for library management with authentication and role-based authorization.

## Features

- **Authentication**: JWT tokens
- **Authorization**: Roles (Regular and Admin)
- **Database**: MySQL
- **Architecture**: Layered (API, Services, Repositories)

## Project Structure

```
src/
  api/
    controllers/     # API controllers
    routes/         # Route definitions
    middleware/     # Authentication/authorization middlewares
  services/         # Business logic
  repositories/     # Data access
  models/           # Types and models
  config/           # Configuration (DB, JWT)
  utils/            # Utilities (JWT, password)
database/
  schema.sql        # Database schema
scripts/
  init-users.sql    # Script to initialize users
```

## Database with Docker

Start MySQL with Docker Compose:
```bash
docker-compose up -d
```

This will create a MySQL container with:
- Database: `library_db`
- Root user: `root` / Password: `rootpassword`
- Port: `3306`

The schema and sample users will be initialized automatically when the container is created.

**Important note about passwords**: The hashes in the `init-users.sql` script are placeholders. To generate valid hashes, you can create users directly through the API using the `/api/auth/register` endpoint after starting the application.

## Sample Users

After the initialization script runs, you'll have:

- **Admin**: 
  - Username: `admin`
  - Password: `password123`

- **Regular**: 
  - Username: `user`
  - Password: `password123`

## Running the Application

```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user

### Authors

- `GET /api/authors` - Get all authors (requires authentication)
- `GET /api/authors/:id` - Get author by ID (requires authentication)
- `GET /api/authors/ordered-by-books` - Get authors ordered by book count (requires authentication)
- `POST /api/authors` - Create author (requires admin)

### Books

- `GET /api/books` - Get all books (requires authentication)
- `GET /api/books/:id` - Get book by ID (requires authentication)
- `GET /api/books/by-author/:authorId` - Get books by author (requires authentication)
- `GET /api/books/ordered-by-date` - Get books ordered by publication date (requires authentication)
- `POST /api/books` - Create book (requires admin)

## API Usage

### 1. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

### 2. Get authors (with token)

```bash
curl -X GET http://localhost:3000/api/authors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Create author (requires admin)

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Gabriel", "lastName": "García Márquez"}'
```

### 4. Get books by author

```bash
curl -X GET http://localhost:3000/api/books/by-author/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Create book (requires admin)

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "One Hundred Years of Solitude",
    "author_id": 1,
    "publication_date": "1967-06-05"
  }'
```

## Notes

- All endpoints (except login and register) require authentication via JWT token
- Creation endpoints (POST) require administrator role
- Regular users can only perform queries (GET)
