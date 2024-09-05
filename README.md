# Dev Connector

Dev Connector is a social networking application where developers can register themselves, create a profile, and share posts. Developers can also like/dislike posts, add experience and education, and delete posts.

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
2. .env File:
   Add the ```.env``` in the backend folder.
   ```bash
   PORT = 3000
    MONGO_URI = mongodb+srv://username:password@cluster0.mongodb.net
    DB_NAME = MyDatabase
    ACCESS_TOKEN_SECRET = your_secret_key_here
    ACCESS_TOKEN_EXPIRES_IN = 7d
    CLOUDINARY_CLOUD_NAME = your_cloud_name
    CLOUDINARY_API_KEY = your_api_key
    CLOUDINARY_API_SECRET = your_api_secret
    NODE_ENV = development
   ```

