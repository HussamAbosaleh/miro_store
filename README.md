MIRO Store

Full-stack e-commerce web application built using the MERN stack and containerized with Docker.

This project simulates a modern online clothing store where users can browse products, manage a cart, place orders, and pay using PayPal. It also includes an admin dashboard for managing products and orders.

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
- PayPal Sandbox API

DevOps

- Docker
- Docker Compose

---

Features

User Features

- Register and login
- Browse products
- View product details
- Add products to cart
- Checkout and create orders
- Pay with PayPal Sandbox
- Leave reviews for purchased products
- Password reset functionality

Admin Features

- Create new products
- Update existing products
- Soft delete products
- Manage product sizes and stock
- View all customer orders
- Basic store statistics dashboard

---

Project Structure

miro_store
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── scripts
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── App.jsx
│
└── docker-compose.yml

---

Running the Project with Docker (Recommended)

Make sure Docker is installed.

Run the following command from the project root:

docker compose up --build

This will start:

- Frontend container
- Backend container
- MongoDB container

After startup, open:

Frontend
http://localhost:5173

Backend API
http://localhost:5000

---

Seeding the Database

If the database is empty, run the seed script inside the backend container:

docker exec -it miro_backend node scripts/seed.js

This will insert sample products into MongoDB.

---

Environment Variables

Create a ".env" file inside the backend folder.

Example:

MONGO_URI=mongodb://mongo:27017/miro_store
JWT_SECRET=your_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id

---

Documentation

Additional documentation is available inside each service.

Backend documentation:
backend/README.md

Frontend documentation:
frontend/README.md

---

Author

Mohamad Hussam Abosaleh