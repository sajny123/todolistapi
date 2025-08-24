const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userModel'
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;