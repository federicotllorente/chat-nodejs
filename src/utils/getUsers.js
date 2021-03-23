import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const options = {
    host: process.env.HOST,
    path: '/user'
};

const callback = response => {
    let str = '';

    // another chunk of data has been received, so append it to `str`
    response.on('data', chunk => {
        str += chunk;
    });

    // the whole response has been received, so we just print it out here
    response.on('end', () => {
        console.log(str);
    });
};


const getUsers = () => {
    http.request(options, callback).end();
};

export default getUsers;