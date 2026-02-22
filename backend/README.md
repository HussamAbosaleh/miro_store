# MIRO Store - E-Commerce Backend

Full-stack graduation project (Backend phase completed).

## Project Overview

MIRO Store is an e-commerce platform backend built using Node.js, Express, and MongoDB.

This backend includes:

- User registration
- Password hashing using bcrypt
- Secure login system
- JWT authentication
- Protected data handling
- Secure model configuration (password hidden by default)

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken

## Authentication Flow

1. User registers with name, email, and password.
2. Password is hashed using bcrypt.
3. User logs in.
4. Server verifies credentials.
5. JWT token is generated and returned.
6. Token must be sent in protected routes using `Authorization: Bearer <token>`.

## Installation

```bash
git clone <your-repo-link>
cd miro_store/backend
npm install
```

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

## Run Development Server

```bash
npm run dev
```
