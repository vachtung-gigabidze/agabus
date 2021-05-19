const express = require('express');
const app = express();
var favicon = require('serve-favicon')

const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes/route');


// const {
//     getActionContent,
//     getActionContentById
// } = require('./database/dboperation.js');

app.use(cors());

app.use(favicon(path.join(__dirname, '../client', 'favicon-32x32.png')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {
    flags: 'a'
});

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}));



app.use(router);



const PORT = 3000;


//GET ALL
// app.get('/api/actionContent', async (req, res) => {
//     // console.log(AC);
//     const actionContext = getActionContent();
//     actionContext.then((value) => {
//         console.log('backend get all');
//         res.status(200).json(value);
//     });
// });

// // Get by Id
// app.get('/api/actionContent/:id/', async (req, res) => {
//     const actionContext = getActionContentById(id);
//     actionContext.then((value) => {
//         console.log('backend get all');
//         res.status(200).json(value);
//     });

// });


app.use(express.static(path.join(__dirname, '../client')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
// });

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Ошибка вышла тут. Сервер не запустился ${PORT}...`);
    } else {
        console.log(`Сервер запущен на порте ${PORT}...`);
    }

});