const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', (req, res) => {
    controller.getMessages()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(error => {
            console.error(`[messageNetwork] Error in database`);
            response.error(req, res, error, 500);
        });
});

router.post('/', (req, res) => {
    controller.addMessage(req.body.user, req.body.message)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(error => {
            console.error(`[messageNetwork] Error in controller`);
            response.error(req, res, error, 400);
        });
});

module.exports = router;