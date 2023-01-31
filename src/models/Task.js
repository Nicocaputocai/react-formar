const mongoose = require('mongoose');

const taskchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    dataExpire:{
        type: Date,
        default: Date.now()
    },
    state:{
        type: Boolean,
        default: 0
    },
    priority:{
        type: String,
        enum: ['Baja','Media','Alta'],
        default: 'Baja'
    },
    // de cierta forma va a ser una relación con otra tabla tiplo sequelize
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' 
    }
},{
    timestamps: true
});



module.exports = mongoose.model('Task', taskchema)