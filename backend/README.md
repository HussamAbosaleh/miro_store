📌 Miro Store – Full Stack E-commerce Backend


🧩 Overview

Miro Store is a backend API for an e-commerce clothing store built with:
Node.js
Express
MongoDB

JWT Authentication
The system supports:
User authentication
Product management
Order processing
PayPal sandbox payment
Product reviews (only for verified purchases)
Admin dashboard statistics

🚀 Features

👤 User

Register / Login (JWT)
View products with:
Pagination
Filtering (gender, category, price)
Sorting (price, newest)
Create orders
Pay order (PayPal sandbox)
Leave review (only if purchased)
🛠 Admin
Create / Update / Soft delete products
Manage sizes & stock
View all orders
View admin statistics:
Total users
Total products
Total orders
Paid orders
Total revenue


project structrue

backend/
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 ├── config
 └── server.js

⚙️ Environment Variables

Create .env file:
PORT=5000
MONGO_URI=mongodb://localhost:27017/miro_store
JWT_SECRET=my_super_secret_key_123456
PAYPAL_CLIENT_ID=JWT_SECRET=my_super_secret_key_123456
