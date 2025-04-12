Full-Stack Application Backend (Node.js + MySQL Boilerplate)
Date: April 10, 2025
Project Type: Group Activity – Backend Full-Stack Development

📌 Introduction
This README outlines the backend architecture and development process for a full-stack application. The backend is built with Node.js , Express , Sequelize ORM , and MySQL , leveraging modern libraries for authentication, email handling, and API documentation. Key features include:

JWT-based Authentication : Secure user login and token management.
Account Management : User registration, profile updates, and account deletion.
Email Verification : Verify user accounts via email confirmation.
Password Reset : Forgot password functionality with secure reset tokens.
Swagger API Documentation : Interactive API documentation at /api-docs.

📁 Project Structure
/
├── _helpers/
│   ├── db.js                 
│   ├── role.js               
│   ├── send-email.js         
│   ├── swagger.js            
├── _middleware/
│   ├── authorize.js          
│   ├── error-handler.js       
│   ├── validate-request.js    
├── accounts/
│   ├── account.model.js      
│   ├── account.service.js     
│   ├── accounts.controller.js 
├── config.json
├── package-lock.json                
├── package.json              
├── server.js
├── swagger.yaml

📦 Install Dependencies
npm install bcryptjs body-parser cookie-parser cors express-jwt express joi jsonwebtoken mysql2 nodemailer rootpath sequelize swagger-ui-express yamljs
npm install nodemon --save-dev

🧠 Key Components

🔹 MySQL Database Wrapper
Path: _helpers/db.js

Connects to the MySQL database using Sequelize ORM.
Initializes tables if they do not exist using sequelize.sync().
🔹 Role Enum
Path: _helpers/role.js

Defines user roles (e.g., User, Admin) used throughout the application.
🔹 Send Email Helper
Path: _helpers/send-email.js

Sends emails for account verification and password reset functionality.
🔹 Swagger API Docs
Path: _helpers/swagger.js

Exposes interactive API documentation at /api-docs using Swagger UI.
🛡️ Middleware

🔐 Authorize Middleware
Path: _middleware/authorize.js

Restricts route access based on user roles and valid JWT tokens.
⚠️ Global Error Handler
Path: _middleware/error-handler.js

Catches unhandled exceptions and provides consistent error responses.
✅ Request Validator
Path: _middleware/validate-request.js

Validates incoming request bodies against Joi schemas to ensure data integrity.
📦 Sequelize Account Model
Path: /accounts/account.model.js

Defines the structure of the accounts table using Sequelize.
Includes fields such as id, email, password, role, and timestamps.
⚙️ Account Service
Path: /accounts/account.service.js
Handles core account-related logic.

Sign-Up & Email Verification : Registers new users and sends verification emails.
JWT & Refresh Token Authentication : Generates and manages JWT and refresh tokens.
Forgot/Reset Password : Handles password reset requests and token validation.
CRUD Operations : Create, Read, Update, and Delete account data.
📡 Accounts Controller
Path: /accounts/accounts.controller.js
Defines all /accounts routes and connects them to service methods.

POST /accounts/register: Register a new account.
POST /accounts/verify-email: Verify an account using a token.
POST /accounts/forgot-password: Request a password reset token.
POST /accounts/reset-password: Reset a password using a token.
POST /accounts/authenticate: Authenticate a user and issue tokens.
GET /accounts: Retrieve all accounts (admin-only).
PUT /accounts/:id: Update an account's details.
POST /accounts/refresh-token: Refresh JWT token using a refresh token.
⚙️ Config
Path: /config.json
Contains configuration options for.

Database Connection : Host, username, password, and database name.
JWT Secret : Secret key for signing JSON Web Tokens.
Email Sender Address : Default sender email for account-related emails.
SMTP Settings : SMTP server credentials for sending emails.

📋 Package Configuration
Path: /package.json
Includes scripts and dependencies for project setup.

🏁 Server Entry Point
Path: /server.js
Initializes middleware, routes, and starts the Express server.

🧪 API Testing with Postman

🔸 Register a New Account

Method: POST
Endpoint: /accounts/register

🔸 Verify Account

Use the token received via email to verify the account:
Method: POST
Endpoint: /accounts/verify-email

🔸 Forgot Password

Request a reset token by providing the user's email:
Method: POST
Endpoint: /accounts/forgot-password

🔸 Reset Password

Reset the password using the token received in the email:
Method: POST
Endpoint: /accounts/reset-password

🔸 Authenticate

Log in to receive JWT and refresh tokens:
Method: POST
Endpoint: /accounts/authenticate

🔸 Get All Accounts

Retrieve all accounts (requires admin privileges):
Method: GET
Endpoint: /accounts

🔸 Update Account

Update an account's details:
Method: PUT
Endpoint: /accounts/:id

🔸 Refresh JWT Token

Use the refresh token to obtain a new JWT:
Method: POST
Endpoint: /accounts/refresh-token

