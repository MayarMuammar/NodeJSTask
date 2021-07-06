const mongoose = require('mongoose');
//const User = require('./UserModel');
const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String, 
        required: true,
    },
    details: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    isChecked: {
        type: Boolean,
        required: true,
        default: false,
    }, 
}, {
    timestamps: true,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;