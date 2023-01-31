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
    origin : function (origin, cb) {
        if(whiteList.includes(origin)){
            cb(null, true)
        }else{
            cb(new Error('Error de CORS'))
        }
    }
}

const auth =  require('./routes/auth')
const users = require('./routes/users')
const project = require('./routes/projetc')
const task = require('./routes/task')
App
    .use(cors(corsOptions))
    .use('/api/auth',auth)
    .use('/api/users', users)
    .use('/api/project', project)
    .use('/api/task', task)
    // .use(cors())


module.exports = App;