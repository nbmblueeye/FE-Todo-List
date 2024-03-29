const asyncHandler = require('express-async-handler');

const Task = require('../models/Task');

// Get todos
const getToDos = asyncHandler(async(req, res) => {
    const allTasks = await Task.find(req.query).sort({createdAt: "desc"});
    res.status(200).json(allTasks);
})

// Add new todo
const addToDo = asyncHandler(async(req, res) => {
    const { title, description, status, deadline } = req.body;
    if(!title && description){
        res.status(400)
        throw new Error("Please enter title field")
    }else if(title && !description){
        res.status(400)
        throw new Error("Please enter description field")
    }else if(!title && !description){
        res.status(400)
        throw new Error("Please enter all input field")
    }else{
        let newTask = await Task.create({
            title: title,
            description: description,
            status: status || false,
            deadline: deadline
        });
        res.status(200).json({
            newTask: newTask, message:"Task created successfully"
        })
    }
})

// Update existing todo
const getToDo = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(400);
        throw new Error("The task does not exist");
    }
    res.status(200).json(task);
})

// Update existing todo
const updateToDo = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(400);
        throw new Error("The task does not exist");
    }

    let updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({updatedTask: updatedTask, message:"Selected task is updated successfully"});
})

// Delete existing todo
const deleteToDo = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
        res.status(400);
        throw new Error("The task does not exist");
    }

    await Task.deleteOne({_id:req.params.id});
    res.status(200).json({id:req.params.id, message:"Selected task is deleted successfully"});
})

module.exports = { getToDos, addToDo, getToDo, updateToDo, deleteToDo }
