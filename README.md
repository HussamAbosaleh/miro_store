# MIRO Store

Full-stack e-commerce web application built using the MERN stack.

This project simulates a modern online clothing store where users can browse products, manage a cart, place orders, and pay using PayPal. It also includes an admin dashboard for managing products and orders.

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- PayPal Sandbox API

---

## Features

### User Features
- Register and login
- Browse products
- View product details
- Add products to cart
- Checkout and create orders
- Pay with PayPal Sandbox
- Leave reviews for purchased products
- Password reset functionality

### Admin Features
- Create new products
- Update existing products
- Soft delete products
- Manage product sizes and stock
- View all customer orders
- Basic store statistics dashboard

---

## Project Structure

miro_store
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
└── frontend
    ├── src
    ├── components
    ├── pages
    └── App.jsx

---

## Running the Project

### Backend

cd backend  
npm install  
npm run dev  

Backend runs on:

http://localhost:5000

---

### Frontend

cd frontend  
npm install  
npm run dev  

Frontend runs on:

http://localhost:5173

---

## Environment Variables

Create a `.env` file in the backend folder.

Example:

MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  
PAYPAL_CLIENT_ID=your_paypal_client_id  

---

## Documentation

Additional documentation is available inside each service.

Backend documentation:  
backend/README.md  

Frontend documentation:  
frontend/README.md  

---

## Author

Mohamad Hussam Abosaleh