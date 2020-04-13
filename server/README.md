# Flying Notes Node Server

## Environment Variables

A `.env` file (https://www.npmjs.com/package/dotenv) should be placed at the root directory which will specify the following variables:

`MONGODB_URI` (required)

`SESSION_SECRET` (required)

`SESSION_LIFETIME` (optional, default: 1 year)

`PORT` (optional, default: 5000)

`HEROKUAPP_URL` - to prevent heroku app from sleeping [depends on dynos] - (optional)

## Available Scripts

### `npm start`

Starts the server.

### `npm run dev`

Starts the server while listening to changes (`nodemon`).

### `npm run start:test`

Starts the server in testing mode (MongoDB Memory Server).

### `npm test`

Performs server tests.

### `npm run test:watch`

Performs tests in watch mode.
