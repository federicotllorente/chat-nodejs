const express = require('express');
const bodyParser = require('body-parser');
// const router = require('./components/message/network');
const router = require('./network/routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router);
router(app);

app.listen(3000);
console.log('The App is listening in http://localhost:3000');