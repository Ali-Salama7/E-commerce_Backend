# E-commerce Backend API

A RESTful backend API for an e-commerce platform, built with a focus on
professional practices: containerized database, authentication, and
transaction-safe inventory handling.

## Tech Stack
- Node.js + Express
- TypeScript
- PostgreSQL (via Docker)
- Prisma ORM
- JWT (authentication)
- bcrypt (password hashing)

## Getting Started

### Prerequisites
- Node.js (LTS)
- Docker

### Setup
1. Clone the repo
```bash
   git clone https://github.com/Ali-Salama7/E-commerce_Backend.git
   cd E-commerce_Backend
```
2. Start the database
```bash
   docker compose up -d
```
3. Install dependencies
```bash
   npm install
```
4. Create a `.env` file (see `.env.example`)
5. Run the dev server
```bash
   npm run dev
```

## Status
🚧 Work in progress
