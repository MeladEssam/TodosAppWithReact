// [
//   {
//     id: 1,
//     title: "first todo titile",
//     description: "first todo discription",
//     status: false, //default
//   },
//   {
//     id: 2,
//     title: "second todo titile",
//     description: "second todo discription",
//     status: false, //default
//   },
//   {
//     id: 3,
//     title: "third todo titile",
//     description: "third todo discription",
//     status: false, //default
//   },
// ]

import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todosSlice",
  initialState: JSON.parse(localStorage.getItem("todos")) || [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    UpdateTask: (state, action) => {
      console.log(action.payload);
      let newState = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });
      return newState;
    },
    deleteTodo: (state, action) => {
      let filteredTodos = state.filter((todo) => todo.id !== action.payload.id);
      return filteredTodos;
    },
    ChangeTodoStatus: (state, action) => {
      let findedTodo = state.find((todo) => todo.id === action.payload.id);
      if (findedTodo) {
        if (findedTodo.status === true) {
          findedTodo.status = false;
        } else {
          findedTodo.status = true;
        }
      }
    },
    deleteAllTodos: (state) => {
      return [];
    },
  },
});
export let {
  addTodo,
  UpdateTask,
  deleteTodo,
  ChangeTodoStatus,
  deleteAllTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
