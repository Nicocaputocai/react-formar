const express = require('express');
const bodyParser = require('body-parser');
const App = express();
const cors = require('cors');

App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cors());
const auth =  require('./routes/auth')
const users = require('./routes/users')
const project = require('./routes/projetc')
const task = require('./routes/task')
App
    .use('/api/auth',auth)
    .use('/api/users', users)
    .use('/api/project', project)
    .use('/api/task', task)


module.exports = App;