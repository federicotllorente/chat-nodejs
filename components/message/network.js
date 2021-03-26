require('dotenv').config();
const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// To manage the filename and the extension
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/${process.env.FILES_ROUTE}/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} ${file.originalname}`);
    }
});

// To upload files in a message
const upload = multer({
    // dest: 'public/files/'
    storage: storage
});

router.post('/', upload.single('file'), (req, res) => {
    controller.addMessage(req.body.user, req.body.chat, req.body.message, req.body.date, req.file)
        .then(data => response.success(req, res, data, 201))
        .catch(error => {
            console.error('[messageNetwork] Error in controller trying to send a message');
            response.error(req, res, error, 500);
        });
});

router.get('/', (req, res) => {
    const filterChat = req.query.chat;
    controller.getMessages(filterChat)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error('[messageNetwork] Error in database trying to list the messages');
            response.error(req, res, error, 500);
        });
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error('[messageNetwork] Error in controller trying to modify a message');
            response.error(req, res, error, 500);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(data => response.success(req, res, data, 200))
        .catch(error => {
            console.error('[messageNetwork] Error in controller trying to delete a message');
            response.error(req, res, error, 500);
        });
});

module.exports = router;