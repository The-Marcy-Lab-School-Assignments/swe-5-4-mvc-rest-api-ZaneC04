const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos


const serveTodos = (req, res, next) => {
  res.status(200).send(todos)
}

app.get("/api/todos", serveTodos)

// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id

const serveSingleTodo = (req, res, next) => {
  const { id } = req.params
  const todo = todos.find(todo => todo.id === Number(id))
  if (!todo) {
    res.status(404).send({Error: `no todo with the id ${id}`})
    return;
  }
  res.status(200).send(todo)
}

app.get("/api/todos/:id", serveSingleTodo)

// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body

const createTodo = (req, res, next) => {
  const { task } = req.body.task
  if (!task) {
    res.status(400).send({Error: "Invalid task description"})
    return;
  }
  const newTask = {id: getId(), task: task, isDone: false}
  res.status(201).send(newTask);
}

app.post('/api/todos', createTodo)

// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id

const updateTodo = (req, res, next) => {
  const id = req.params
  const isDone = req.body.isDone
  const todo = todos.find(todo => todo.id === Number(id))
  if (!todo) {
    res.status(404).send({Error: 'task not found'})
    return;
  }
  todo.isDone = isDone
  res.status(200).send(todo)
  // const isDone = req.body.isDone;
  // const id = req.params.id;
  // const todo = todos.find((todo) => todo.id === Number(id));
  // if (!todo) {
  //   res.status(404).send(`ID not found`);
  //   return;
  // }
  
  // todo.isDone = isDone;
  // res.send(todo);
}

app.patch("/api/todos/:id", updateTodo)

// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id


// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)


const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
