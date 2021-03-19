const express = require('express');
const response = require('../../network/response');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.headers);
    res.header({
        "custom-header": "This is a custom header"
    });
    response.success(req, res, 'Message list');
});

router.post('/', (req, res) => {
    console.log(req.body);
    console.log(req.query);
    if (req.query.error == 'ok') {
        console.error(`[response error] ${req.query.error}`);
        response.error(req, res, 'Unexpected error', 400);
    } else {
        response.success(req, res, 'Message sent correctly!', 201);
    }
});

module.exports = router;