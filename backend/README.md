Miro Store Backend API

Backend API for the Miro Store e-commerce project.

Built with:

- Node.js
- Express
- MongoDB
- JWT Authentication
- PayPal Sandbox

---

Overview

The backend provides the core API for an online clothing store.

It handles:

- User authentication
- Product management
- Cart and orders
- PayPal sandbox payments
- Product reviews (only for verified purchases)
- Admin dashboard statistics

---

Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- PayPal Sandbox API

---

Features

User

- Register / Login (JWT authentication)
- Browse products with:
  - Pagination
  - Filtering (gender, category, price)
  - Sorting (price, newest)
- Create orders
- Pay orders using PayPal sandbox
- Leave product reviews (only if purchased)

Admin

- Create products

- Update products

- Soft delete products

- Manage product sizes and stock

- View all orders

- View dashboard statistics:
  
  - Total users
  - Total products
  - Total orders
  - Paid orders
  - Total revenue

---

Project Structure

backend/
├── controllers
├── models
├── routes
├── middleware
├── config
└── server.js

---

Environment Variables

Create a ".env" file inside the backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/miro_store
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id

---

Run Backend

Install dependencies:

npm install

Start development server:

npm run dev

Server runs on:

http://localhost:5000

---

API Base URL

http://localhost:5000/api

Example endpoints:

Method| Endpoint| Description
POST| /api/users/login| Login user
POST| /api/users/register| Register user
GET| /api/products| Get products
POST| /api/orders| Create order
GET| /api/orders/my| Get user orders

---

Future Improvements

- Payment confirmation webhooks
- Email order notifications
- Product image optimization
- Deployment with Docker
- Production environment configuration