const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router(app);

// See statics in /app
app.use('/app', express.static('public'));

app.listen(3000, () => console.log('The App is listening in http://localhost:3000'));