const express = require('express');

var { graphqlHTTP } = require('express-graphql');
var schema  = require('./graphql/schema');
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./graphql/schema');
// const infoItems = [{id:1, ItemType:'News'}];
//const controller = require('./controller/controller');
const actionContentController = require('./graphql/actionContentController');

const app = express();
//var favicon = require('serve-favicon')

const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
//const router = require('./routes/route');
//const { Resolver } = require('dns');

const PORT = 3000;

// const {
//     getActionContent,
//     getActionContentById
// } = require('./database/dboperation.js');

app.use(cors());

// const createInfoItem = (input) => {
//     const id = Date.now();
//     return {
//         id, ...input
//     }
// }

// const root = {
//     getAllInfoItem: () => {
//         return infoItems
//     },
//     getInfoItem: ({id}) => {
//         return infoItems.find(infoItem => infoItem.id == id)
//     },
//     createInfoItem: ({input}) => {
//         const infoItem = createInfoItem(input);
//         infoItems.push(infoItem);
//         return infoItem;

//     }
// }
// app.use('/graphql', controller.graphqlHTTP());
// app.use(
//     '/graphql',
//     graphqlHTTP({
//       schema,
//       graphiql: true,
//       rootValue: root,

//     }),
//   );

//app.use(favicon(path.join(__dirname, '../client', 'favicon-32x32.png')))

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

//app.use(router);


const root = {
    getAllActionContent: actionContentController.getAllActionContent, 
    getActionContent: ({id}) => actionContentController.getActionContentByID(id),
    createActionContent: ({input}) => actionContentController.addActionContent(input),
    updateActionContent: ({input}) => actionContentController.updateActionContent(input),
    deleteActionContent: ({id}) => actionContentController.deleteActionContent(id),

}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

//app.use(express.static(path.join(__dirname, '../client')));

//app.use(express.static(path.join(__dirname, '../node_modules')));
// app.use(express.static(path.join(__dirname, '../node_modules/quill-html-edit-button')));

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