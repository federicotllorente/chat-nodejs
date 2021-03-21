const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res) => {
    controller.addMessage(req.body.user, req.body.message)
        .then(data => response.success(req, res, data, 201))
        .catch(error => {
            console.error(`[messageNetwork] Error in controller`);
            response.error(req, res, error, 400);
        });
});

router.get('/', (req, res) => {
    const filterUser = req.query.user;
    controller.getMessages(filterUser)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error(`[messageNetwork] Error in database`);
            response.error(req, res, error, 500);
        });
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error(`[messageNetwork] Error in controller`);
            response.error(req, res, error, 500);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error(`[messageNetwork] Error in controller`);
            response.error(req, res, error, 500);
        });
});

module.exports = router;