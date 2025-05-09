import { configureStore } from "@reduxjs/toolkit";
import todosReucer from "./TodosSlice";
import modalSlice from "./ModalSlice";
let store = configureStore({
  reducer: {
    todos: todosReucer,
    modal: modalSlice,
  },
});
export default store;
