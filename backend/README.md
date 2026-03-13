# MIRO Store — Backend API

Backend API for the **MIRO Store** e-commerce project.

This service provides the core functionality for the online clothing store including authentication, product management, orders, and payments.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- PayPal Sandbox API

---

## Overview

The backend API powers the e-commerce platform and manages:

- User authentication
- Product management
- Cart and orders
- PayPal sandbox payments
- Product reviews (only for verified purchases)
- Admin dashboard statistics

---

## Features

### User

- Register / Login (JWT authentication)
- Browse products with:
  - Pagination
  - Filtering (gender, category, price)
  - Sorting (price, newest)
- Create orders
- Pay orders using PayPal Sandbox
- Leave product reviews (only if the product was purchased)

### Admin

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

## Project Structure

backend  
│  
├── controllers  
├── models  
├── routes  
├── middleware  
├── config  
└── server.js  

---

## Environment Variables

Create a `.env` file inside the **backend** folder:

PORT=5000  
MONGO_URI=mongodb://localhost:27017/miro_store  
JWT_SECRET=your_jwt_secret  
PAYPAL_CLIENT_ID=your_paypal_client_id  

---

## Run the Backend

Install dependencies:

npm install

Start development server:

npm run dev

Server runs on:

http://localhost:5000

---

## API Base URL

http://localhost:5000/api

---

## Example Endpoints

Method | Endpoint | Description  
POST | /api/users/login | Login user  
POST | /api/users/register | Register user  
GET | /api/products | Get products  
POST | /api/orders | Create order  
GET | /api/orders/my | Get user orders  

---

## Future Improvements

- Payment confirmation webhooks
- Email order notifications
- Product image optimization
- Deployment with Docker
- Production environment configuration