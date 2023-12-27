# Blog App API

This is an API for managing a blog application. It provides endpoints for creating, retrieving, updating, and deleting blog posts.

Regarding the extra features:
- JWT token is used for authentication, which means it provides a secure way for users to log in and access the protected routes.
- Node mailer is used for sending emails. This could be used for sending out notifications or alerts to users.

The `db.js` file connects to a MongoDB database using the Mongoose library, and it logs a message to the console if the connection is successful.

## Project Structure
- `index.js`: Main entry point of the application. Sets up the server and defines routes.
- `db.js`: Connects to the MongoDB database.
- `routes`: Contains route handlers for various endpoints.
- `models`: Defines Mongoose schemas for the database.
- `middlewares`: Contains custom middleware functions.

## Installation
1. Install Node.js and npm.
2. Clone the repository.
3. Run `npm install` to install the dependencies.
4. Set up a MongoDB database and update the connection string in `db.js`.

## Usage
1. Start the server using `node index.js`.
2. Access the API endpoints for creating, retrieving, updating, and deleting blogs.

## API Endpoints
- `POST /users/signup`: Register a new user.
- `POST /users/login`: User login.
- `POST /blogs/createblog`: Create a new blog.
- `GET /blogs/getallblogs`: Retrieve all blogs.
- `GET /blogs/:id`: Retrieve a specific blog by ID.
- `PUT /blogs/updateblog/:id`: Update a specific blog by ID.
- `DELETE /blogs/deleteblog/:id`: Delete a specific blog by ID.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose

## Contributors
- Mihir Chauhan

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
