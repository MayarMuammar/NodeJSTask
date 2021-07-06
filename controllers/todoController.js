const Todo = require('../models/todoModel.js')
// const User = require('./models/userModel.js')

// @desc    Add new todo
// @route   POST /api/todos
// @access  Private
const addTodo = async(req, res) => {
    const {
        title,
        details,
        dueDate,
    } = req.body;
    if(!title) {
        res.status(400);
        throw new Error('No todo title')
    } else {
        const todo = new Todo({
            user: req.user._id,
            title,
            details,
            dueDate,
        });

        const createdTodo = await todo.save()
        res.status(201)
        res.json(createtdTodo)
    }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(todo) {
        todo.title = req.body.title || todo.title;
        todo.details = req.body.details || todo.details;
        todo.dueDate = req.body.dueDate || todo.dueDate;
        todo.isChecked = req.body.isChecked || todo.isChecked;

        const updatedTodo = await todo.save();
        res.json({
            _id: updatedTodo._id,
            title: updatedTodo.title,
            details: updatedTodo.details,
            isChecked: updatedTodo.isChecked,
        }); 
    } else {
        res.status(404);
        throw new Error('Todo not found')
    }
}

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(todo) {
        await todo.remove();
        res.json({message: "Todo Removed"})
    } else {
        res.status(404)
        throw new Error('Todo Not Found')
    }
}

// @desc    Get todo information for specific user
// @route   GET /api/todos/:id
// @access  Private
const getTodoById = async(req, res) => {
    const todo = await Todo.findById(req.params.id).populate('user');
    if (todo) {
        res.json(todo)
    } else {
        res.status(404)
        throw new Error('Todo not found')
    }
}

//@desc     Get all todo for specific user
//@route    GET /api/todos
//@access    Private
const getMyTodos = async(req, res) => {
    const todos = await Todo.find({user: req.user._id})
    res.json(todos);
}

module.exports = {
    addTodo:        addTodo,
    updateTodo:     updateTodo,
    deleteTodo:     deleteTodo,
    getTodoById:    getTodoById,
}