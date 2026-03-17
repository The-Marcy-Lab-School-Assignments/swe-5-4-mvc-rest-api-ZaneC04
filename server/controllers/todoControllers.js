const todoModel = require(`../models/todoModel.js`);


module.exports.listTodos = (req, res, next) => {
  const todos = todoModel.list()
  res.status(200).send(todos)
}


module.exports.findTodo = (req, res, next) => {
  const { id } = req.params
  const todo = todoModel.find(Number(id))
  if (!todo) {
    res.status(404).send({Error: `no todo with the id ${id}`})
    return;
  }
  res.status(200).send(todo)
}


module.exports.createTodo = (req, res, next) => {
  const task = req.body.task
  if (!task) {
    res.status(400).send({Error: "Invalid task description"})
    return;
  }
  const newTask = todoModel.create(task)
  res.status(201).send(newTask);
}


module.exports.updateTodo = (req, res, next) => {
  const id = req.params.id
  const isDone = req.body.isDone
  const todo = todoModel.update(Number(id), isDone)
  if (!todo) {
    res.status(404).send({Error: 'task not found'})
    return;
  }
  todo.isDone = isDone
  res.status(200).send(todo)
}


module.exports.deleteTodo = (req, res, next) => {
  const id = req.params.id
  const todo = todoModel.destroy(Number(id))
  if (!todo) {
    res.status(404).send({Error: 'task not found'})
    return;
  }
  res.sendStatus(204)
}