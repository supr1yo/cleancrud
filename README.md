# CleanCRUD 
![PRs Accepted](https://img.shields.io/badge/PRs-accepted-brightgreen.svg)
![Node](https://img.shields.io/badge/node-%3E=22.x-blue.svg)
![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-blue)
![Last Commit](https://img.shields.io/github/last-commit/supr1yo/cleancrud)

A clean, simple and scalable RESTful API built with **Express**, **Prisma**, **MongoDB**, and **Zod**, providing a solid boilerplate for authentication and product CRUD operations.

---

## 🛠️ Tech Stack

- **Backend Framework:** [Express.js](https://expressjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Authentication:** JWT (via `jsonwebtoken`)
- **API Documentation:** [Swagger UI](https://swagger.io/tools/swagger-ui/) (powered by `swagger-ui-express` and `swagger-jsdoc`)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cleancrud.git
cd cleancrud
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory. See `.env.example`

### 4. Generate Prisma client

```bash
npx prisma generate
```

> Make sure your `schema.prisma` is configured to use MongoDB.

### 5. Run the server

```bash
npm run dev
```

---

## 📘 API Documentation

This project uses **Swagger (OpenAPI 3.0)** for API documentation.

After starting the server, visit:

```
http://localhost:3000/docs
```

You can interact with and test all API endpoints directly from this UI. JWT bearer authentication is supported via the Authorize button.

---

## 🔐 Authentication

- **Signup:** `POST /v1/signup`
- **Login:** `POST /v1/login`

Authenticated routes require a **Bearer token** in the `Authorization` header or a cookie (`cleancookie`).

---

## 📦 Product Routes

| Method | Endpoint            | Description                | Auth Required |
|--------|---------------------|----------------------------|---------------|
| GET    | `/v1/products`       | Get all products            | ✅ Yes        |
| GET    | `/v1/products/:id`   | Get product by ID           | ✅ Yes        |
| POST   | `/v1/products`       | Create new product          | ✅ Yes        |
| PUT    | `/v1/products/:id`   | Update a product            | ✅ Yes        |
| DELETE | `/v1/products/:id`   | Delete a product            | ✅ Yes        |

---

## ✅ Validation

- All request bodies are validated using **Zod**.
- Example schemas:
  - `signupSchema`
  - `loginSchema`
  - `productSchema`

---

## 📃 License

MIT License © 2025 Supriyo Kumar Aich
