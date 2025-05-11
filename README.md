# Sweat-Smart MERN Stack Application

## Overview

Sweat-Smart is a modern full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack. The app offers an intuitive interface for users to manage gym-related data, track their progress, and interact with various features of the gym website. It utilizes a RESTful API to handle user authentication, gym-related data management, and frontend communication.

This application is designed with responsiveness and performance in mind, using Tailwind CSS for styling, Vite for fast frontend development, and a robust backend with MongoDB for storing user data.

## Tech Stack

### Frontend:
- **React**: A JavaScript library for building user interfaces, React is used for rendering dynamic content and providing a seamless user experience.
- **Vite**: A modern build tool that provides fast development with support for hot module replacement (HMR) and optimized production builds.
- **Tailwind CSS**: A utility-first CSS framework for fast and responsive styling of the application. Tailwind ensures a clean and customizable UI, providing great flexibility in design.
- **Zustand**: A lightweight state management solution for React applications. It allows for easy state sharing across components.
- **React Router DOM**: A library for handling routing in React, enabling navigation between different pages in the app.
- **Axios**: A promise-based HTTP client for making requests to the backend API.

### Backend:
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side logic and handling HTTP requests.
- **Express.js**: A minimal and flexible Node.js web application framework used for building the backend API.
- **MongoDB**: A NoSQL database used for storing user data, gym-related information, and other application data.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment, providing a straightforward way to interact with MongoDB in Node.js.
- **JWT (JSON Web Tokens)**: Used for user authentication and securing API routes by generating tokens for logged-in users.
- **bcryptjs**: A library for hashing passwords, providing an extra layer of security for user authentication.
- **CORS**: Cross-Origin Resource Sharing middleware for handling cross-origin requests between the frontend and backend.

## Features

### Frontend Features:
- **User Interface**: A responsive and dynamic user interface built with React and styled with Tailwind CSS. The app adapts to different screen sizes, ensuring a smooth experience on both mobile and desktop devices.
- **State Management**: Zustan is used to manage global state across components, making it easy to share and update state between different parts of the app.
- **Routing**: React Router DOM is used to handle client-side navigation, allowing users to move between different pages such as the dashboard, gym settings, or profile.
- **API Communication**: Axios is used to make HTTP requests to the backend API, ensuring smooth interaction with the server to fetch data, submit forms, and authenticate users.

### Backend Features:
- **User Authentication**: JWT authentication is used to secure routes and ensure only authorized users can access certain resources. bcryptjs is used to securely hash user passwords.
- **Database Integration**: Mongoose is used to interact with the MongoDB database, allowing for efficient querying and management of user and gym-related data.
- **CORS Support**: CORS middleware is configured to enable communication between the frontend and backend, allowing cross-origin requests.
- **Environment Variables**: The backend is configured with dotenv to securely manage sensitive information such as API keys, database connection strings, and JWT secrets.

### Development Tools:
- **Nodemon**: A development tool for automatically restarting the server when code changes, improving the development workflow.
- **ESLint**: A static code analysis tool for identifying and fixing potential issues in the codebase. Ensures that the code adheres to best practices and coding standards.

## Directory Structure

### Backend:
- **`index.js`**: The entry point for the backend server, where Express is initialized and routes are defined.
- **`models/`**: Contains Mongoose models for MongoDB collections (e.g., users, gyms).
- **`controllers/`**: Defines the logic for handling requests (e.g., user authentication, data fetching).
- **`middleware/`**: Contains middleware for authentication (e.g., JWT verification) and other necessary checks.
- **`routes/`**: Defines the API routes for user login, registration, and gym data interactions.

### Frontend:
- **`src/`**: The main source directory containing React components, hooks, and utility functions.
  - **`components/`**: Contains reusable components like buttons, forms, and modals.
  - **`pages/`**: Contains React components for different pages of the app (e.g., Dashboard, Profile, Login).
  - **`services/`**: Contains utility functions for making HTTP requests using Axios to interact with the backend.
  - **`store/`**: Zustand stores for managing global application state.
  - **`styles/`**: Contains the Tailwind CSS configuration and custom styles.

## Running the Project

### Backend:
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install

To start the server in development mode, run:

bash
Copy
Edit
npm run dev
The server will start using nodemon, and any changes to the backend code will automatically restart the server.

Frontend:
Navigate to the sweat_smart directory.

Install dependencies:

bash
Copy
Edit
npm install
To start the frontend in development mode, run:

bash
Copy
Edit
npm run dev
The app will be available on http://localhost:3000 by default.

**Conclusion** - 
Sweat-Smart is a robust MERN stack application that combines the flexibility of React on the frontend with the power of Node.js, Express, and MongoDB on the backend. The app features seamless user authentication, interactive data management, and a responsive UI. It’s designed for developers who want to manage gym-related activities in a modern, full-stack application environment.
