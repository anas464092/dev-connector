# Dev Connector

Dev Connector is a social networking application where developers can register, create a profile, and share their ideas through posts. They can help other developers by commenting on their issues. Developers can also like or dislike posts, add experience and education to their profiles, and delete their own posts.

## Features

- User authentication and registration
- Create, edit, and delete posts
- Like and dislike posts
- Create and edit user profiles
- Add experience and education to profiles

## Technologies Used

- MongoDB, Express, React, Node.js (MERN Stack)
- JWT for authentication
- Cloudinary for image storage
- Redux for state management

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anas464092/dev-connector.git
   cd dev-connector
   ```
2. Add the ```.env``` in the backend folder.
   ```bash
    PORT = YOUR_PORT
    MONGO_URI = YOUR_MONGO_URI
    DB_NAME = YOUR_DB_NAME
    ACCESS_TOKEN_SECRET = your_secret_key_here
    ACCESS_TOKEN_EXPIRES_IN = 7d
    CLOUDINARY_CLOUD_NAME = your_cloud_name
    CLOUDINARY_API_KEY = your_api_key
    CLOUDINARY_API_SECRET = your_api_secret
    NODE_ENV = development
   ```
3. ## Available Scripts

In the project directory, you can run the following commands:

### `npm run frontend-install`

Installs the dependencies for the frontend application. This should be run whenever you clone the repository or need to update the frontend dependencies.

### `npm run server`

Starts the backend server in development mode using `nodemon`, which automatically restarts the server when file changes are detected.

### `npm start`

Starts the backend server in production mode without `nodemon`.

### `npm run frontend`

Starts the frontend application.

### `npm run dev`

Runs both the backend and frontend concurrently. Useful for development as it launches both the server and frontend in one command.

### `npm run build`

Builds the entire application. This command:
- Installs backend dependencies
- Installs frontend dependencies
- Builds the frontend application for production

Ensure that you have all dependencies installed before running this command.

      

