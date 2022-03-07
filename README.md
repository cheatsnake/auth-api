# 🔐 Auth API

Complete API for user authentication with email confirm &amp; JWT &amp; roles.

## ⬆️ Stack

-   TypeScript
-   Express.js
-   PostgreSQL (pg)
-   Nodemailer
-   JsonWebToken
-   BcryptJS

## 🚀 Setup

1. Clone this repo and install dependencies:

```sh
npm install
```

2. Create a new database and use SQL scripts from `sql` folder to create required tables.

3. Create `.env` file with required credentials:

```env
# Base URL of your server
API_URL=http://localhost:5000

# Connection to PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=postgres

# Random secret keys to encrypt data by JWT
JWT_ACCESS_SECRET=SomeSecretKey
JWT_REFRESH_SECRET=AndAnotherSecretKey

# Data to access an email account to send activation messages
SMTP_USER=example@mail.com
SMTP_PASSWORD=EmailPassword
SMTP_SERVICE=EmailService
```

4. Create production build & run server:

```sh
npm run build
```

```sh
npm start
```

Or launch server in develepment mode with nodemon:

```sh
npm run dev
```

> Base server url: http://localhost:5000

## 📌 End-points

-   **POST** _/auth/register_ - Register a new user

```json
{
    "username": "user",
    "firstName": "User",
    "lastName": "User",
    "email": "user@mail.com",
    "password": "123456"
}
```

-   **POST** _/auth/login_ - Enter to the account by username & password

```json
{
    "username": "user",
    "password": "123456"
}
```

-   **POST** _/auth/logout_ - Logout from the account & clear cookies
-   **GET** _/auth/refresh_ - Update life time of access token by refresh token that stored in cookies
-   **GET** _/public_ - Route that are available to everyone
-   **GET** _/guest_ - Route that are available to all registered users _(Need `Authorization` header with access token)_
-   **GET** _/protected_ - Route that are available to all users with verified email _(Need `Authorization` header with access token)_
-   **GET** _/admin_ - Route that are available only for admins _(Need `Authorization` header with access token)_
