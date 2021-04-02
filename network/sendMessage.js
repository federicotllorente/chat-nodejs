// This function is not being used anymore (now there's a fetch() one in the custom hook 'useHandleChat')

require('dotenv').config();
const http = require('http');

const sendMessage = message => {
    const data = JSON.stringify(message);
    const options = {
        hostname: process.env.HOST_NAME || window.location.host,
        port: '', // Change or comment it ???
        path: '/message',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const req = http.request(options, res => {
        console.log(`[sendMessage.js] statusCode: ${res.statusCode}`);
        res.on('data', d => {
            process.stdout.write(d);
        });
    });
    req.on('error', e => {
        console.error(e);
    });
    req.write(data);
    req.end();
};

module.exports = sendMessage;