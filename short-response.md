# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

## **Your answer here**:

The three design choices that make this API RESTful are as follows:

- The endpoints **do not describe actions, but resources**. For example, the endpoint for creating a new task is `"/api/todos"` and not `"/api/createTodo"`.
- The responses from our server use the **proper status codes**. For example, when a task is successfully created, the response sends with a `201` status code which represents the creation of a new resource was successful.
- Our URL shows a **clear hierarchy of resources**. For example, the URL `"/api/todos/3"` gives the todo in our todo list with an id of 3.

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

## **Your answer here**:

- The problem caused by mixing data and request/response logic is that our code will become **a "monolith"** of a file and be hard to **maintain and grow**.
- By separating these into a model and controller, it allows us as developers to individually test our logic, and add on to our logic without creating a massive, singular file. As a downside, the logic between files becomes harder to understand, and requires the importing and exporting of different modules.

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

- First, in `frontend/src/main.js`, the function `handleTodosListClick` handles the click for the todo list and checkbox and will get the current checkbox status (clicked = true, not clicked = false) and then sends that value into the `updateTodos` function in `frontend/src/fetch-helpers.js`.

- Next, in `frontend/src/fetch-helpers.js`, `updateTodos` will run and make a request to the endpoint of `/api/todos/id` with the `PATCH` method and the "done" (`isDone`) value as a property in our request body.

- Then, in `server/index.js`, `app.patch("/api/todos/:id", todoControllers.updateTodos)` will run which calls the `updateTodos` controller from `server/controllers/todoControllers.js`.

- Following this, in `server/controllers/todoControllers.js`, the `updateTodos` controller then assigns the `id` parameter from the endpoint to the `id` variable, along with the `isDone` value from our request body, and uses those variables as parameters for the call of `todoModel.update`.

- Finally, in `server/models/todoModel.js`, our `.update` function is called and uses the `id` argument to find the todo we're updating and setting that todo's `isDone` value to be the one passed as a argument.

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

- Line 1 should be in the **controller** as it handles processing the request, and not the database.
- Line 2 should be in the **model** as it is checking if a task or data exists in the database.
- Line 3 should be in the **model** because it is adding data or a new todo to our database/todo list.
- Line 4 should be in the **model** since it is adding that new data to our database therefore interacting with it.
- Line 5 should be in the **controller** due to it handling the response and status code.
