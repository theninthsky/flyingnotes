# Flying Notes

A MERN stack web application for taking notes.

The app is deployed here: http://flyingnotes.herokuapp.com/

![Notes](/images/notes.png)

## Environment Variables

You should create a `.env` file (https://www.npmjs.com/package/dotenv) at the root directory which will specify the following variables:

`MONGODB_URI` (required)

`ACCESS_TOKEN_SECRET` (required)

`ACCESS_TOKEN_EXPIRES_IN` (optional, default: 1 year)

`PORT` (optional, default: 5000)

`HEROKUAPP_URL` - to prevent heroku app from sleeping [depends on dynos] - (optional)

`REACT_APP_SERVER_URL` (required, default: http://localhost:5000)

</br>

A `.env` file is also required at the root React directory (client) with the following variable:

`SKIP_PREFLIGHT_CHECK=true` - to prevent collision with Jest versions between React and the server - (required)

## Available Scripts

### `npm start`

Starts the server.

### `npm run dev`

Starts the server while listening to changes (`nodemon`).

### `npm run client`

Runs the React app (`npm start`).

### `npm run app`

Builds the React app and starts the server.

### `npm run start:test`

Starts the server in testing mode (MongoDB Memory Server).

### `npm test`

Performs server tests.

### `npm run test:watch`

Performs tests in watch mode.

### `npm run deploy`

Performs server tests and deploys the app.
