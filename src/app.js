const express = require('express');
const bodyParser = require('body-parser');
const App = express();
const cors = require('cors');

App.use(express.json());
App.use(express.urlencoded({ extended: false }));
// App.use(cors());
//No va a funcionar POSTMAN!!
const whiteList = [process.env.URL_FRONT]
const corsOptions = {
    origin : function (origin, callback) {
        if(whiteList.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

const auth =  require('./routes/auth')
const users = require('./routes/users')
const project = require('./routes/projetc')
const task = require('./routes/task');
const checkToken = require('./middleware/checkToken');
App
    .use(cors()) // si uso postman tengo que sacar el corsOptions
    .use('/api/auth',auth)
    .use('/api/users', users)
    .use('/api/projects', checkToken ,project)
    .use('/api/task', task)
    // .use(cors())


module.exports = App;