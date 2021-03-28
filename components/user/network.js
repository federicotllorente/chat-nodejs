const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res) => {
    controller.addUser(req.body.name, req.body.status)
        .then(data => response.success(req, res, data, 201))
        .catch(error => {
            console.error('[userNetwork] Error in controller trying to create a user');
            response.error(req, res, error, 400);
        });
});

router.get('/', (req, res) => {
    const filterUser = req.query.name;
    controller.getUsers(filterUser)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error('[userNetwork] Error in database trying to list the users');
            response.error(res, res, error, 500);
        });
});

// router.path();

router.delete('/:id', (req, res) => {
    controller.deleteUser(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error('[userNetwork] Error in controller trying to delete a user');
            response.error(req, res, error, 500);
        });
});

module.exports = router;