# Expense Tracker Application

This is the documentation for the expense tracker app. The backend is built using **Laravel** and the frontend is built with **React**.

### Requirements

- PHP >= 8.1
- Composer
- MySQL or other supported database
- Laravel CLI (`composer global require laravel/installer`)
- Node.js & NPM (for compiling front-end assets if needed)

---
## Expense Tracker Backend Setup (Laravel)
### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/neldrine/expense-tracker.git
   ```

2. **Navigate to the backend folder**
   ```bash
   cd expense-tracker-backend
   ```

3. **Install dependencies**
   ```bash
   composer install
   ```

4. **Copy the environment file**
   ```bash
   cp .env.example .env
   ```

5. **Run database migrations**
   ```bash
   php artisan migrate
   ```

6. **Seed the database with dummy data**
   ```bash
   php artisan db:seed
   ```

7. **JWT token issues?**  
   Refer to the official docs:  
   https://jwt-auth.readthedocs.io/en/develop/laravel-installation/

---

If everything went smoothly, your Laravel backend should be set up!

**Backend URL:**  
http://127.0.0.1:8000





## Expense Tracker API – Laravel Endpoints



This API provides endpoints for managing personal expenses. All routes require authentication via a Bearer token. 

API was tested using Insmonia REST https://insomnia.rest/download

## Headers Required for API Requests

When making requests to Laravel API endpoints, ensure the following headers are set:
```

Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json

```

These headers are required to authenticate and properly handle JSON input/output in Laravel's API routes.





## Base URL

```

http://127.0.0.1:8000/api

```



---



## Authentication



### `POST /auth/login`

Authenticate user and receive a token.



**Body:**

```json

{
"name": "your_username",
"password": "your_password"
}

```
**Response:**
```json
{
  "token": "your_token_here",
  "user": { ... }
}
```

### `POST /auth/logout`
Log out the current user.

**Headers:**
```
Authorization: Bearer <token>
```

---

## Expenses

### `GET /expenses`
Get a list of all expenses for the authenticated user.

**Optional Query Parameters:**
- `category` – filter by category
- `date` – filter by exact date (`YYYY-MM-DD`)

**Example:**
```
/expenses?category=Food&date=2025-05-13
```

**Headers:**
```
Authorization: Bearer <token>
```

---

### `POST /expenses`
Create a new expense.

**Body:**
```json
{
  "description": "Lunch at Pret",
  "amount": 8.50,
  "category": "Food",
  "date": "2025-05-13"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

---

### `PUT /expenses/{id}`
Update an existing expense.

**Body:**
```json
{
  "description": "Updated description",
  "amount": 9.00,
  "category": "Food",
  "date": "2025-05-13"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

---

### `DELETE /expenses/{id}`
Delete an expense by ID.

**Headers:**
```
Authorization: Bearer <token>
```



## Notes

- Ensure you pass the `Authorization` header with every protected request.
- Date format must be `YYYY-MM-DD`.


## Expense Tracker Frontend Setup (React)

Follow these steps to resume the React frontend project from a Git repository.

---

### 1. Navigate to the front-end directory

```bash
cd expense-tracker-frontend
```

---

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

---


---

### 3. Start the Development Server

Run the app locally:

```bash
npm run dev
```

This will start the Vite dev server, usually at [http://localhost:5173](http://localhost:5173).
