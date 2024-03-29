const express = require('express');
const router = express.Router();

const { getToDos, addToDo, updateToDo, deleteToDo, getToDo } = require('../controllers/todoControllers');

//Get todos, Post todo
router.route('/').get(getToDos).post(addToDo);

//PUT todo, Delete todo
router.route("/:id").get(getToDo).put(updateToDo).delete(deleteToDo);

module.exports = router;