import { createSlice } from "@reduxjs/toolkit";
import { SHOW_HOME, SHOW_TODOS, SHOW_SETTINGS, SHOW_USER  } from "../other/constants";

export const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        [SHOW_HOME]: false,
        [SHOW_TODOS]: true,
        [SHOW_SETTINGS]: false,
        [SHOW_USER]: false,
    },
    reducers: {
        showComponent(state, action) {
            Object.keys(state).forEach(keyName => {
                if (keyName === action.payload) {
                    state[keyName] = true;
                } else {
                    state[keyName] = false;
                }
            });
        }
    }
}); 

export const {
    showComponent
} = navbarSlice.actions;

export default navbarSlice.reducer;