# weblify_backend

Weblify is a URL Shortener that allows users to shorten long URLs and share them easily. The project aims to provide a simple and user-friendly service that can generate short, unique, and customizable URLs from any valid input URL.

## Installation

1. Clone the repository: `git clone https://github.com/obinnafranklinduru/weblify`
2. Change directory to weblify: `cd weblify`
3. Install dependencies: `yarn install`
4. Set up environment variables:
   - Create a `.env` file in the project root directory
   - Provide the following variables in the `.env` file:
     ```
        MONGODB_URL=your-mongodb-uri
        JWT_SECRET=your-jwt-secret
        PORT=5000
        NODE_ENV=development
        BASE_URL=http://localhost:5000
     ```
5. Start the server: `yarn run start`

The API will be accessible at `http://localhost:5000`.

## Features

- User registration: Users can create an account by providing a unique email address and password.
- User login: Users can log in with their password and email address and receive a JWT token for authentication.
- Shorten a URL: Allows users to shorten a long URL and generate a unique short URL.
- Retrieve Original URL: Enables users to retrieve the original URL associated with a short URL.
- Customizable Short URLs: Provides the ability to generate customizable short URLs based on the custom text (for only registered users).
- Response in JSON Format: All responses are in JSON format for easy integration and consumption by applications.
- Rate Limiting: Implements rate limiting to prevent abuse and ensure fair usage of the API.

## API Routes

| Route                  | Method | Description                      |
| ---------------------- | ------ | -------------------------------- |
| /v1/auth/register      | POST   | Register a new user              |
| /v1/auth/login         | POST   | Log in and get JWT token         |
| /v1/auth/logout        | GET    | Log out and invalidate JWT token |
| /v1/urls               | GET    | Get all urls                     |
| /v1/urls/:id           | GET    | Get a url by ID                  |
| /v1/urls               | POST   | Shorten a URL (logged in users)  |
| /v1/urls/public        | POST   | Shorten a URL                    |
| /v1/urls/sh/:shortCode | GET    | Retrieve Original URL            |
| /v1/urls/:id           | DELETE | Delete a generated url by ID     |
| /v1/users              | GET    | Get all users                    |
| /v1/users/:id          | GET    | Get a user by ID                 |
| /v1/users/:id          | DELETE | Delete a user by ID              |

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) and other npm packages.

## Testing the API / API Documentation

Run Test in [Swagger UI](https://weblify.onrender.com/v1/docs/)

## Error Handling

The API handles errors by returning appropriate HTTP status codes and error messages. Common error scenarios include invalid requests, unauthorized access, and internal server errors. Error messages are returned in JSON format for easy consumption by clients.

## Deployment

To deploy the API to a production, you can use platforms like Render, Cyclic, Heroku, AWS, or Azure. But this project was deployed on Render Platform. Here are some steps to deploy:

## Usage

To use the URL Shortener API, you can make HTTP requests to the provided endpoints. You can integrate this service into your applications, websites, or any other platform that requires URL shortening.

## Contributing

Contributions to the project are welcome! If you find any issues or would like to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/obinnafranklinduru/weblify_backend/blob/master/LICENSE).
