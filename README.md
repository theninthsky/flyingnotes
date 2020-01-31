# Flying Notes ![Logo](/client/public/favicon.ico)

A MERN stack web application for taking notes.

The app is deployed here: http://flyingnotes.herokuapp.com/

![Notes](/images/notes.png)</br>

## Environment Variables

You should create a `.env` file (https://www.npmjs.com/package/dotenv) at the root directory which will specify the following variables:</br>

`MONGODB_URI (required)`</br>

`SESSION_SECRET (required)`</br>

`PORT (optional, default: 5000)`</br>

`HEROKUAPP_URL (optional, prevents heroku app from sleeping [depends on dynos])`</br>

`REACT_APP_SERVER_URL (required)`</br>

## Available Scripts

### `npm start`

Starts the server.</br>

### `npm run dev`

Starts the server while listening to changes (`nodemon`).</br>

### `npm run client`

Runs the react app (`npm start`).</br>

### `npm run app`

Builds the react app and starts the server.

### `npm run start:test`

Starts there server in testing mode (mongodb memory server).</br>

### `npm test`

Performs server tests.</br>

### `npm run test:watch`

Performs tests in watch mode.
