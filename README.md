<p align="center">
  <a href="https://wakatime.com/badge/github/BaGorK/nestjs-blog-app-api" target="blank"><img src="https://wakatime.com/badge/github/BaGorK/nestjs-blog-app-api.svg" alt="" /></a>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/54e3ce9e-f867-4383-b361-4eb8ee6e1665" />
</p>

# NestJS Blog API

This project is a robust **NestJS Blog API** designed to handle user authentication, Google OAuth login, JWT-based access control, and various other features for a blog application. It uses PostgreSQL with TypeORM and integrates several essential technologies, including JWT for authentication and bcrypt for password hashing.

---

## Features

- **User Authentication**: Sign-in and JWT token-based authentication.
- **Google Authentication**: Supports Google login using OAuth2 tokens.
- **JWT Tokens**: Secure access and refresh tokens for user sessions.
- **Role-based Access**: Protect routes based on the user's authentication state.
- **PostgreSQL Database**: All data is stored in a PostgreSQL database using TypeORM.
- **Environment Configuration**: Dynamic configuration for different environments using `@nestjs/config`.

---

## Technologies

- **NestJS**: A powerful Node.js framework for building efficient and scalable server-side applications.
- **PostgreSQL**: A relational database management system.
- **TypeORM**: An ORM that works with SQL-based databases and integrates seamlessly with NestJS.
- **JWT**: JSON Web Tokens for securing endpoints and handling user sessions.
- **BcryptJS**: For secure password hashing.
- **Google OAuth**: For authenticating users via Google.
- **Joi**: For validating environment variables.

---

## Getting Started

Follow the steps below to get your NestJS blog API up and running locally.

### Prerequisites

- Node.js v18 or higher
- PostgreSQL
- NestJS CLI (Optional, but recommended)

### Installation

1. Clone this repository:

   ```bash
    git clone https://github.com/BaGorK/nestjs-blog-app-api.git
    cd nestjs-blog-app-api
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Compile and run the project

   ```bash
   # development
   yarn run start

   # watch mode
   yarn run start:dev

   # production mode
   yarn run start:prod
   ```

4. Create a .env file in the root directory and set the required environment variables. You can reference the example below:

   ```bash
   NODE_ENV=development
   DATABASE_PORT=5432
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_HOST=localhost
   DATABASE_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   JWT_TOKEN_AUDIENCE=your_jwt_audience
   JWT_TOKEN_ISSUER=your_jwt_issuer
   JWT_ACCESS_TOKEN_TTL=3600
   JWT_REFRESH_TOKEN_TTL=25920
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   API_VERSION=v1
   ```

---

### Available Scripts

**start:dev** : Run the application in development mode with live reload (`NODE_ENV=development`).
**start:prod** : Run the application in production mode.
**build** : Build the project.
**format** : Format the code using Prettier.
**lint** : Lint the codebase using ESLint.
**test** : Run unit tests using Jest.
**test:watch** : Watch for file changes and rerun tests.
**test:cov** : Generate code coverage for tests.
**test:e2e** : Run end-to-end tests.
**doc** : Generate and view API documentation with Compodoc.

### API Endpoints

#### Authentication

POST `/auth/sign-in`: Sign in with email and password.
POST `/auth/refresh-tokens`: Refresh your JWT access and refresh tokens.
POST `/auth/google-authentication`: Authenticate a user using a Google OAuth token.

### Swagger Documentation

API documentation is available at `https://nestjs-blog-app-api.onrender.com/api`. You can interact with the API endpoints directly from the Swagger UI.

### Database

This project uses PostgreSQL as the database engine. The connection details are configured using environment variables. The application relies on TypeORM for database interaction, which supports migrations and synchronization.

#### Database Configuration Example

```typescript
export default registerAs('database', () => ({
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || 'localhost',
  database_name: process.env.DATABASE_NAME,
  autoLoadEntities: Boolean(process.env.NODE_ENV === 'development'),
  synchronize: Boolean(process.env.NODE_ENV === 'development'),
  ssl: Boolean(process.env.NODE_ENV === 'production'),
}));
```

### Security

- Passwords are securely hashed using bcryptjs.
- Tokens are signed using JWT and include secure HTTP-only cookies.
- All sensitive configuration, including the JWT secret and database credentials, should be stored securely in environment variables.
