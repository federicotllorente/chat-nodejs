require('dotenv').config();
const express = require('express');
const app = express();
// Creating an HTTP server with the Node native module 'http'
// in order to connect the API with a WebSockets server
const server = require('http').Server(app);

const webpack = require('webpack');

if (process.env.NODE_ENV === 'development') {
    const webpackConfig = require('./webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const webpackServerConfig = { port: process.env.PORT, hot: true };

    app.use(webpackDevMiddleware(compiler, webpackServerConfig));
    app.use(webpackHotMiddleware(compiler));
}

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

// Connecting to the DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
db(uri);

// Enabling all CORS requests
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);
router(app);

// See statics in /app
app.use(`/${process.env.PUBLIC_ROUTE}`, express.static('public'));

// Listening connections
server.listen(process.env.PORT, () => {
    console.log(`The App is listening in ${process.env.HOST}:${process.env.PORT}`);
});