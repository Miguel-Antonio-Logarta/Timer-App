import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { camelCaseKeys, snakeCaseKeys } from "../other/utilities";
import Cookies from "universal-cookie";
import { authHeader } from "../other/utilities";

export const createUser = createAsyncThunk('user/createUser', async (data) => {
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/user/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(snakeCaseKeys(data))
    });
    if (response.ok) {
        const responseData = await response.json();
        return camelCaseKeys(responseData);
    }
});

export const login = createAsyncThunk('user/login', async (data) => {
    let loginCredentials = new FormData();
    loginCredentials.append("username", data.username);
    loginCredentials.append("password", data.password);

    const response = await fetch(`https://logarta-timers-server.herokuapp.com/user/login`, {
        // We should not set the content type because it breaks the browser's ability to 
        // Delimit fields in the request body
        method: "POST",
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // },
        // body: {
        //     "username": JSON.stringify(data.username),
        //     "password": JSON.stringify(data.password)
        // },
        body: loginCredentials
    });
    if (response.ok) {
        const responseData = await response.json();
        return camelCaseKeys(responseData);
    }
});

export const getUserMe = createAsyncThunk('user/getUserMe', async (_, {rejectwithValue}) => {
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/user/me`, {
        method: "GET",
        headers: {
            ...authHeader()
        }
    });
    if (response.ok) {
        const data = await response.json();
        return camelCaseKeys(data);
    } else {
        return rejectwithValue('Cannot fetch user');
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        user: null
    },
    reducers: {
        logout(state, action) {
            const cookies = new Cookies();
            cookies.remove('user');
            state.loggedIn = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.fulfilled, (state, action) => {
            // We will receive an access token
            const cookies = new Cookies();
            cookies.set("user", {
                accessToken: action.payload.accessToken
            })
            state.loggedIn = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            const cookies = new Cookies();
            cookies.set("user", {
                accessToken: action.payload.accessToken
            });
            state.loggedIn = true;
        })
        .addCase(getUserMe.fulfilled, (state, action) => {
            state.loggedIn = true;
            state.user = action.payload;
        })
        .addCase(getUserMe.rejected, (state, action) => {
            state.loggedIn = false;
            state.user = null;
        })
    } 
})

export const {
    logout
} = userSlice.actions;

export default userSlice.reducer;