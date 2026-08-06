# E-Commerce Backend API

A production-style RESTful backend for an e-commerce platform, built to demonstrate
professional backend engineering practices: containerized infrastructure, secure
authentication, role-based authorization, and transaction-safe inventory management.

## Highlights

- **Transaction-safe checkout** — order creation and inventory deduction run inside a
  single Prisma database transaction, preventing overselling under concurrent requests.
- **Role-based authorization** — JWT authentication combined with admin-only middleware
  protecting product management endpoints.
- **Price snapshotting** — order line items store the product price at the time of
  purchase, so historical orders stay accurate even if product prices change later.
- **Centralized error handling** — custom error classes (`NotFoundError`,
  `BadRequestError`, `UnauthorizedError`, `ForbiddenError`) flow through a single
  Express error-handling middleware instead of ad-hoc status codes in every route.
- **Type-safe end to end** — TypeScript with `zod` request validation and Prisma-generated
  types, run under strict compiler settings (`strict`, `exactOptionalPropertyTypes`).

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Runtime        | Node.js, TypeScript                 |
| Framework      | Express                             |
| Database       | PostgreSQL                          |
| ORM            | Prisma                              |
| Auth           | JWT, bcrypt                         |
| Validation     | Zod                                 |
| Infrastructure | Docker (Postgres container)         |

## Architecture

The project is organized by **domain/feature** rather than by technical layer, which
keeps everything related to one area of functionality in one place:

```
src/
├── auth/            # Registration, login, JWT issuing
├── products/         # Product catalog CRUD
├── orders/            # Order creation, order history
├── middleware/        # Auth, admin-role, and centralized error handling
├── shared/            # Custom error classes, shared helpers
├── config/            # Prisma client instance
└── server.ts          # App entry point
```

## Data Model

```
User ──< Order ──< OrderItem >── Product
```

- A `User` can place many `Order`s.
- An `Order` contains many `OrderItem`s (line items), enabling multi-product orders.
- Each `OrderItem` stores its own `price` — a snapshot of the product's price at
  purchase time — decoupling historical orders from future price changes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Docker](https://www.docker.com/)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Ali-Salama7/E-commerce_Backend.git
   cd E-commerce_Backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```
3. Start PostgreSQL via Docker
   ```bash
   docker compose up -d
   ```

4. Run database migrations
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.

## Authentication

Protected routes require a JWT sent in the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

A token is issued by `POST /auth/login` and is valid for 7 days. Admin-only routes
additionally require the authenticated user's role to be `ADMIN`.

## API Reference

### Auth

| Method | Endpoint         | Access | Description                  |
|--------|------------------|--------|-------------------------------|
| POST   | `/auth/register` | Public | Create a new user account     |
| POST   | `/auth/login`    | Public | Authenticate and receive a JWT |

### Products

| Method | Endpoint         | Access      | Description              |
|--------|------------------|-------------|---------------------------|
| GET    | `/products`      | Public      | List all products         |
| GET    | `/products/:id`  | Public      | Get a single product      |
| POST   | `/products`      | Admin only  | Create a product          |
| PUT    | `/products/:id`  | Admin only  | Update a product          |
| DELETE | `/products/:id`  | Admin only  | Delete a product           |

### Orders

| Method | Endpoint            | Access         | Description                          |
|--------|---------------------|----------------|----------------------------------------|
| POST   | `/orders`           | Authenticated  | Place an order (multiple line items)  |
| GET    | `/orders/my-orders` | Authenticated  | List the current user's order history |

#### Example — Placing an order

```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ]
}
```

The server verifies stock availability for every item, computes the total price,
creates the order with its line items, and decrements product inventory — all inside
one atomic transaction. If any item is unavailable, the entire order is rejected and
no partial changes are made.

## Error Handling

All errors are returned in a consistent shape:

```json
{ "error": "Product not found" }
```

| Status | Meaning                                  |
|--------|--------------------------------------------|
| 400    | Invalid request data                        |
| 401    | Missing or invalid authentication token      |
| 403    | Authenticated but not authorized (not Admin) |
| 404    | Resource not found                           |
| 500    | Unexpected server error                      |

## Project Status

🚧 Actively developed as a learning/portfolio project. Planned next: order status
management and pagination on product listings.

## License

ISC