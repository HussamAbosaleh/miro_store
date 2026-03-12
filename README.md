MIRO Store

Full-stack e-commerce web application built using the MERN stack.

This project simulates a modern online clothing store with authentication, product management, cart system, and order processing.

---

Tech Stack

Frontend

- React (Vite)
- React Router
- Context API
- CSS

Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- PayPal Sandbox

---

Features

User

- Register / Login
- Browse products
- Product details page
- Add products to cart
- Checkout and create orders
- Pay using PayPal Sandbox
- Leave reviews for purchased products

Admin

- Create products
- Update products
- Soft delete products
- Manage product sizes and stock
- View all orders
- View store statistics

---

Project Structure

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

Running the Project

Backend

cd backend
npm install
npm run dev

Backend runs on:

http://localhost:5000

---

Frontend

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

---

Documentation

Additional documentation is available inside each service:

Backend documentation

backend/README.md

Frontend documentation

frontend/README.md

---

Author

Mohamad Hussam Abosaleh