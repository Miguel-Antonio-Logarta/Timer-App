import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import navbarReducer from "./navbarSlice";
import timerReducer from "./timerSlice";

const store = configureStore({
    reducer: {
        todos: todoReducer,
        navbar: navbarReducer,
        timer: timerReducer
    }
});

export default store;