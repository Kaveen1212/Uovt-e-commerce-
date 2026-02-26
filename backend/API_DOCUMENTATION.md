# E-Commerce API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register
- **POST** `/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "1234567890",
  "address": "123 Main St",
  "role": "customer"
}
```
- **Response:** `{ user, token }`

### Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response:** `{ user, token }`

## Users

### Get All Users (Protected)
- **GET** `/users`

### Get Current User Profile (Protected)
- **GET** `/users/profile`

### Get User by ID (Protected)
- **GET** `/users/:id`

### Update User (Protected)
- **PUT** `/users/:id`
- **Body:** Partial user data

### Delete User (Protected)
- **DELETE** `/users/:id`

## Products

### Get All Products
- **GET** `/products`

### Search Products
- **GET** `/products/search?q=<query>`

### Get Products by Category
- **GET** `/products/category/:category`

### Get Product by ID
- **GET** `/products/:id`

### Create Product (Protected)
- **POST** `/products`
- **Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "stock": 100,
  "category": "Electronics",
  "brand": "Brand Name"
}
```

### Update Product (Protected)
- **PUT** `/products/:id`
- **Body:** Partial product data

### Delete Product (Protected)
- **DELETE** `/products/:id`

## Cart

### Get Cart Items (Protected)
- **GET** `/cart`

### Add to Cart (Protected)
- **POST** `/cart`
- **Body:**
```json
{
  "productId": "uuid",
  "quantity": 2
}
```

### Update Cart Item (Protected)
- **PUT** `/cart/:productId`
- **Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart (Protected)
- **DELETE** `/cart/:productId`

### Clear Cart (Protected)
- **DELETE** `/cart`

## Wishlist

### Get Wishlist (Protected)
- **GET** `/wishlist`

### Add to Wishlist (Protected)
- **POST** `/wishlist`
- **Body:**
```json
{
  "productId": "uuid"
}
```

### Check if Product in Wishlist (Protected)
- **GET** `/wishlist/check/:productId`

### Remove from Wishlist (Protected)
- **DELETE** `/wishlist/:productId`

### Clear Wishlist (Protected)
- **DELETE** `/wishlist`

## Orders

### Create Order (Protected)
- **POST** `/orders`
- **Body:**
```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2
    }
  ],
  "shippingAddress": "123 Main St, City, Country",
  "phone": "1234567890",
  "notes": "Optional delivery notes"
}
```

### Get My Orders (Protected)
- **GET** `/orders/my`

### Get Order by ID (Protected)
- **GET** `/orders/:id`

### Get All Orders (Protected - Admin)
- **GET** `/orders`

### Cancel Order (Protected)
- **PATCH** `/orders/:id/cancel`

### Update Order Status (Protected - Admin)
- **PATCH** `/orders/:id/status`
- **Body:**
```json
{
  "status": "processing" | "shipped" | "delivered" | "cancelled"
}
```

## Payments

### Create Payment (Protected)
- **POST** `/payments`
- **Body:**
```json
{
  "orderId": "uuid",
  "amount": 199.99,
  "paymentMethod": "credit_card" | "debit_card" | "paypal" | "stripe" | "cash_on_delivery"
}
```

### Process Payment (Protected)
- **PATCH** `/payments/:id/process`
- **Body:**
```json
{
  "transactionId": "TXN-123456"
}
```

### Fail Payment (Protected)
- **PATCH** `/payments/:id/fail`
- **Body:**
```json
{
  "reason": "Insufficient funds"
}
```

### Refund Payment (Protected - Admin)
- **PATCH** `/payments/:id/refund`

### Get Payment by ID (Protected)
- **GET** `/payments/:id`

### Get Payments by Order (Protected)
- **GET** `/payments/order/:orderId`

### Get All Payments (Protected - Admin)
- **GET** `/payments`

## Order Status Flow
1. `pending` - Order created
2. `processing` - Payment completed
3. `shipped` - Order shipped
4. `delivered` - Order delivered
5. `cancelled` - Order cancelled

## Payment Status Flow
1. `pending` - Payment initiated
2. `completed` - Payment successful
3. `failed` - Payment failed
4. `refunded` - Payment refunded

## Error Responses
All errors return appropriate HTTP status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```
