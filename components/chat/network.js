const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// Create a new chat with a users array
router.post('/', (req, res) => {
    controller.createChat(req.body.users)
        .then(data => response.success(req, res, data, 201))
        .catch(error => {
            console.error('[chatNetwork] Error in the controller trying to create a new chat');
            response.error(req, res, error, 500);
        });
});

// Get (list) all the chats
router.get('/:userId', (req, res) => {
    controller.getChats(req.params.userId)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error('[chatNetwork] Error in the database trying to list the chats');
            response.error(req, res, error, 500);
        });
});

router.delete('/:id', (req, res) => {
    if (!req.query.byUser) {
        // Delete by chat ID
        controller.deleteChat(req.params.id)
            .then(data => response.success(req, res, data, 200))
            .catch(error => {
                console.error('[chatNetwork] Error in controller trying to delete a chat');
                response.error(req, res, error, 500);
            });
    } else if (req.query.byUser) {
        // Delete by user ID
        controller.deleteChatByUser(req.params.id)
            .then(data => response.success(req, res, data, 200))
            .catch(error => {
                console.error('[chatNetwork] Error in controller trying to delete a chat');
                response.error(req, res, error, 500);
            });
    }
});

module.exports = router;