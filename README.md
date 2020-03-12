# Flying Notes

A MERN stack web application for taking notes.

The app is deployed here: http://flyingnotes.herokuapp.com/

![Notes](/images/notes.png)</br>

## Environment Variables

You should create a `.env` file (https://www.npmjs.com/package/dotenv) at the root directory which will specify the following variables:</br>

`MONGODB_URI` (required)</br>

`SESSION_SECRET` (required)</br>

`PORT` (optional, default: 5000)</br>

`HEROKUAPP_URL` (optional, prevents heroku app from sleeping [depends on dynos])</br>

`REACT_APP_SERVER_URL` (required, default: http://localhost:5000)</br>

</br>

A `.env` file is also required at the root React directory (client) with the following variable:</br>

`SKIP_PREFLIGHT_CHECK=true` (required, prevents collision with Jest versions between React and the server)</br>

## Available Scripts

### `npm start`

Starts the server.</br>

### `npm run dev`

Starts the server while listening to changes (`nodemon`).</br>

### `npm run client`

Runs the React app (`npm start`).</br>

### `npm run app`

Builds the React app and starts the server.

### `npm run start:test`

Starts the server in testing mode (MongoDB Memory Server).</br>

### `npm test`

Performs server tests.</br>

### `npm run test:watch`

Performs tests in watch mode.
