const express = require('express')
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {
    addTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
} = require('../controllers/todoController')

router
    .route('/')
    .post(protect, addTodo);
router
    .route(':id')
    .get(protect, getTodoById)
    .delete(protect, deleteTodo)
    .put(protect, updateTodo);

module.exports = router;
