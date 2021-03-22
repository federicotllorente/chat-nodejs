const express = require('express');
const app = express();
// Creating an HTTP server with the Node native module 'http'
// in order to connect the API with a WebSockets server
const server = require('http').Server(app);

const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

// Connecting to the DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
db(uri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);
router(app);

// See statics in /app
app.use('/app', express.static('public'));

// Listening connections
server.listen(3000, () => console.log('The App is listening in http://localhost:3000'));