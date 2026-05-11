# 🛒 E-Commerce REST API Backend

A production-grade RESTful API backend for an e-commerce application built with **Node.js**, **Express.js**, and **MongoDB**. Features secure OTP-based authentication, role-based access control, product management with image uploads, and a full shopping cart engine.

---

## 🚀 Features

- 🔐 **OTP Email Authentication** — Passwordless login via email OTP (Nodemailer + SMTP). JWT issued only after OTP verification. OTPs are single-use with 5-minute expiry and auto-cleared post-verification.
- 🛡️ **Role-Based Access Control** — Separate admin and user middleware chains. Admin routes are fully decoupled from user routes — no shared token surface.
- 📦 **Product Management** — Admin-only product creation with image upload (Multer, disk storage). Enum-based validation for categories and units at the schema level.
- 🛒 **Shopping Cart Engine** — Add, update, and remove cart items. Quantity merge logic prevents duplicate line items. Atomic DB operations using Mongoose `$pull` and `findOneAndUpdate`.
- 🚦 **Rate Limiting** — IP-based OTP rate limiting (max 3 requests / 15 min) using `express-rate-limit` to prevent email flooding and brute-force attacks.
- 🗄️ **MongoDB + Mongoose** — Clean data modelling with schema-level validation, population, and timestamps.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| Email / OTP | Nodemailer (SMTP/Gmail) |
| File Upload | Multer (disk storage) |
| Rate Limiting | express-rate-limit |
| Dev Tool | Nodemon |

---

## 📁 Project Structure

```
src/
├── controllers/
│   ├── adminController.js       # Admin register & login
│   ├── ProductControllers.js    # Create & fetch products
│   ├── sendotpController.js     # Send & verify OTP
│   └── add-tocart.js            # Cart operations
├── models/
│   ├── adminmodel.js            # Admin schema
│   ├── userModel.js             # User schema (OTP + expiry)
│   ├── products.js              # Product schema
│   └── cart.js                  # Cart schema
├── routes/
│   ├── adminRoute.js            # /api/v1/admin-*
│   ├── userEmailRoute.js        # /api/v1/send-otp, verify-otp
│   ├── productRoute.js          # /api/v1/products
│   └── cartRout.js              # /api/v1/cart
├── middlewares/
│   ├── adminMiddleware.js       # Admin JWT verification
│   ├── verifyOtpMiddleware.js   # User JWT verification
│   ├── imageMiddleware.js       # Multer file upload
│   └── rateLimitMiddleware.js   # OTP rate limiting
├── nodeMailer/
│   ├── generate-otp.js          # 6-digit OTP generator
│   └── send-otp.js              # Nodemailer transporter
└── server.js                    # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Gmail account with App Password enabled (for SMTP)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/madhupadamativeedi/groceryapplication.git
cd ecommerce-backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
```

> **Note:** For Gmail SMTP, generate an [App Password](https://myaccount.google.com/apppasswords) — do not use your main Gmail password.

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/send-otp` | Send OTP to email | None |
| POST | `/api/v1/verify-otp` | Verify OTP & get JWT | None |

### Admin Routes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/admin-register` | Register admin | None |
| POST | `/api/v1/admin-login` | Admin login & get JWT | None |

### Product Routes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/Products` | Create product (with image) | Admin JWT |
| GET | `/api/v1/products` | Get all products | None |

### Cart Routes
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/add-to-cart` | Add item to cart | User JWT |
| GET | `/api/v1/get-cart` | Get user's cart | User JWT |
| POST | `/api/v1/remove-from-cart` | Remove item from cart | User JWT |
| POST | `/api/v1/update-items-in-cart` | Update item quantity | User JWT |

---

## 🔒 Authentication Flow

```
User enters email → POST /send-otp
       ↓
OTP generated (6-digit) → stored in DB with 5-min expiry
       ↓
Email sent via Nodemailer (SMTP)
       ↓
User submits OTP → POST /verify-otp
       ↓
OTP validated → cleared from DB → JWT issued
       ↓
JWT used as Bearer token for protected routes
```

---

## 🧪 Sample Requests

### Send OTP
```json
POST /api/v1/send-otp
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Add to Cart
```json
POST /api/v1/add-to-cart
Headers: Authorization: Bearer <your_jwt_token>
{
  "productId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "quantity": 2
}
```

### Create Product (Admin)
```
POST /api/v1/Products
Headers: Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data

name: "Organic Apples"
price: 120
desc: "Fresh organic apples from Himachal Pradesh"
units: "1kg"
category: "fruits"
image: <file>
```

---

## 🗂️ Product Categories & Units

**Categories:** `fruits` · `vegetables` · `dairy` · `meat` · `bakery` · `beverages` · `snacks` · `household` · `personal care`

**Units:** `1kg` · `2kg` · `3kg` · `4kg` · `5kg`

---

## 🔮 Roadmap

- [ ] Password hashing for user registration
- [ ] Centralized error handling middleware
- [ ] Input validation with `express-validator`
- [ ] Order management module
- [ ] Payment gateway integration (Razorpay)
- [ ] Refresh token support
- [ ] Unit tests with Jest



- GitHub: https://github.com/madhupadamativeedi/groceryapplication/tree/main/backend
- LinkedIn: https://www.linkedin.com/in/madhu-padamativeedi/
- Email: madhumadhu8588@gmail.com
