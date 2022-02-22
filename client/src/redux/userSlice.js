import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { camelCaseKeys, snakeCaseKeys } from "../other/utilities";

export const createUser = createAsyncThunk('users/createUser', async (data) => {
    return;
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        testReducer(state, action) {
            console.log("This is a test reducer");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.fulfilled, (state, action) => {
            console.log("Create user fulfilled");
        })
    } 
})

export const {
    testReducer
} = userSlice.actions;

export default userSlice.reducer;