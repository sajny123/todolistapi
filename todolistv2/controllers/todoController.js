const mongoose = require('mongoose');
const Todo = require('../models/todoModel');

exports.createTodo = async (req, res) => {
    const { title, description, importance } = req.body;

    const todo = new Todo({ id: req.user.id, title, description, importance});

    try {
        await todo.save();
        return res.status(200).json({
            message: "Todo created successfully."
        })
    } catch (error) {
        return res.status(400).json({ 
            message: "Todo could not be created."
        })
    }
}

exports.getTodos = async (req, res) => {
    const { filter, startDate, endDate } = req.query;
    
    const userId = req.user.id;

    const query = { id: userId };

    if (filter) {
        const now = new Date();
        if (filter === 'today') {
            query.createdAt = {
                $gte: new Date(now.setDate(now.getDate() - 1)) 
            }
        }
        else if (filter === 'week') {
            query.createdAt = {
                $gte: new Date(now.setDate(now.getDate() - 7))
            }
        }
        else if (filter === 'month') {
            query.createdAt = {
                $gte: new Date(now.setMonth(now.getMonth() - 1))
            }
        }
    }

    if (startDate && endDate) {
        query.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }

    try {
        console.log(query);
        const todos = await Todo.find(query)
        return res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching todos."
        })
    }
}

exports.removeTodo = async (req, res) => {
    const { id } = req.params;
    const query = req.user.userId;
    if (!id) {
        res.status(404).json({
            message: "Todo ID not found."
        })
    } else {
        try {
            const isDeleted = await Todo.findOneandDelete({ _id: id, id: query})
            if (!isDeleted) {
                res.status(404).json({
                    message: "Todo not found."
                })
            } else {
                if (isDeleted) {
                    res.status(202).json({
                        message: "Todo deleted successfully.",
                        isDeleted
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                messsage: "Error occured while deleting todo."
            })
        }
    }
}

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, importance } = req.body;
    const query = req.user.id;

    if (!id || !title || !description || !importance) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }
    else {
        try {
            const todo = await Todo.findOne({ _id: id, id: query});

            if (!todo) {
                res.status(404).json({
                    message: "Todo not found."
                })
            }
            todo.title = title;
            todo.description = description;
            todo.importance = importance;

            const isUpdated = await todo.save();
            if (isUpdated) {
                res.status(200).json({
                    message: "Todo updated successfully.",
                    updatedTodo: isUpdated
                })
            } else {
                res.status(404).json({
                    message: "Todo could not be updated."
                })
            }
        } catch (error) {
            res.status(400).json({
                message: "An error occurred while updating the todo."
            })
        }    
    }
}
