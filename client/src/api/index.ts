export const api = {
  baseUrl: "http://localhost:5000/api/",

  get: {
    getAllTodos: "todos/get-all/",
    getTodoById: "todos/get-one/",
  },
  post: {
    postNewTodo: "todos/new/",
    login: "auth/login/",
    register: "auth/register/",
  },

  put: {
    editTodo: "todos/edit-description/",
    editItsDone: "todos/todos-done/",
  },

  delete: {
    deleteTodo: "todos/delete/",
  },
};
