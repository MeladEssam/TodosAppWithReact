import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    isOpen: false,
    selectedTodo: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.selectedTodo = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedTodo = null;
    },
  },
});

export let { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
