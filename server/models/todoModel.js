let id = 1;
const getId = () => id++;


const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

module.exports.list = () => {
    return [...todos];
}

module.exports.find = (id) => {
    const todo = todos.find(todo => todo.id === Number(id))
    if (!todo) return null
    return {...todo}
}

module.exports.create = (task) => {
    const newTodo = {id: getId(), task: task, isDone: false}
    todos.push(newTodo)
    return {...newTodo}
}

module.exports.update = (id, isDone) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    if (!updatedTodo) return null;
    updatedTodo.isDone = isDone;
    return { ...updatedTodo };
}

module.exports.destroy = (id) => {
    const TodoIndex = todos.findIndex((todo) => todo.id === id);
    if (TodoIndex === -1) return false
    todos.splice(TodoIndex, 1)
    return true
}
