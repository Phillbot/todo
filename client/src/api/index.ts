export const api = {
  baseUrl: "http://localhost:5000/",

  get: {
    getAllTodos: "todos/get-all/",
    getTodoById: "todos/get-one/",
  },
  post: {
    postNewTodo: "todos/new/",
  },

  put: {
    editTodo: "todos/edit-description/",
    editItsDone: "todos-done/",
  },

  delete: {
    deleteTodo: "todos/delete/",
  },
};
