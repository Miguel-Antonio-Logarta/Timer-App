import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import navbarReducer from "./navbarSlice";
import timerReducer from "./timerSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        todos: todoReducer,
        navbar: navbarReducer,
        timer: timerReducer,
        user: userReducer
    }
});

export default store;