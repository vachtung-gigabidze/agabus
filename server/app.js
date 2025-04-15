const express = require('express');

const goldenEyeRoutes = require("./routes/golden_eye_route");
const authRoutes = require("./routes/auth_route");

const app = express();
//var favicon = require('serve-favicon')

const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 1984;

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
console.log(`${__dirname}\\web\\driver_pass`);

app.use("/golden_eye", goldenEyeRoutes);
app.use("/auth", authRoutes);
app.use('/driver_pass', express.static(`${__dirname}\\web\\driver_pass`));

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



app.listen(PORT, (err) => {
    if (err) {
        console.log(`Ошибка вышла тут. Сервер не запустился ${PORT}...`);
    } else {
        console.log(`Сервер запущен на порте ${PORT}...`);
    }
});

// const actionContentController = require('./graphql/actionContentController');

//const router = require('./routes/route');
//const { Resolver } = require('dns');

// const {
//     getActionContent,
//     getActionContentById
// } = require('./database/dboperation.js');

//app.use(router);

// const root = {
//     getAllActionContent: actionContentController.getAllActionContent, 
//     getActionContent: ({id}) => actionContentController.getActionContentByID(id),
//     createActionContent: ({input}) => actionContentController.addActionContent(input),
//     updateActionContent: ({input}) => actionContentController.updateActionContent(input),
//     deleteActionContent: ({id}) => actionContentController.deleteActionContent(id),

// }

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
// }));

//app.use(express.static(path.join(__dirname, '../client')));

//app.use(express.static(path.join(__dirname, '../node_modules')));
// app.use(express.static(path.join(__dirname, '../node_modules/quill-html-edit-button')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
// });

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