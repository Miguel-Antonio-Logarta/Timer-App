import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { camelCaseKeys, snakeCaseKeys } from "../other/utilities";

// If fetching fails, move todos to local storage and set synced to false
// When user has reconnected to server, sync up todos with database
// Also add support for anonymous sessions so that the user does not need an account to store their todos and settings
// When the user is not logged in, use localStorage and cookies.
// when the user is logged in, connect to the database.

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch("http://127.0.0.1:8000/todos", { 
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
     });
    if (response.ok) {
        const data = await response.json();
        return data;
    } 
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, { 
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
     });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
});

export const createTodoAsync = createAsyncThunk('todos/createTodo', async (data) => {
    const response = await fetch(`http://127.0.0.1:8000/todos`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            time_left: data.timeLeft,
            due_date: data.dueDate,
        })
    })

    if (response.ok) {
        const data = await response.json();
        return data;
    } 
})

export const updateTodoAsync = createAsyncThunk('todos/updateTodo', async (data) => {
    // Clean up the request body
    const { hrs, mins, secs, newTodo, active, ...requestBody } = data;
    const response = await fetch(`http://127.0.0.1:8000/todos/${data.id}`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(snakeCaseKeys(requestBody))
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
});

export const completeTodoAsync = createAsyncThunk('todos/completeTodo', async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/todos/${id}`, { 
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
})

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        addClicked: false,
        editableId: [],
        activeId: null,
        fetchTodo: true
    },
    reducers: {
        editTodo(state, action) {
            state.editableId.push(action.payload);
        },
        clickAdd(state, action) {
            state.addClicked = action.payload;
        },
        setActive(state, action) {},
        discardChanges(state, action) {
            if (action.payload.newTodo) {
                state.addClicked = false;
            } else {
                state.editableId = state.editableId.filter((id) => id !== action.payload.id);
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodosAsync.fulfilled, (state, action) => {
            return { 
                ...state, 
                todos: camelCaseKeys(action.payload), 
                fetchTodo: false 
            }
        })
        .addCase(deleteTodoAsync.fulfilled, (state, action) => {
            return {
                ...state, 
                fetchTodo: true
            }
        })
        .addCase(createTodoAsync.fulfilled, (state, action) => {
            return {
                ...state, 
                addClicked: false, 
                fetchTodo: true
            }
        })
        .addCase(updateTodoAsync.fulfilled, (state, action) => {
            return {
                ...state,
                editableId: state.editableId.filter((id) => id !== action.payload.id),
                fetchTodo: true
            }
        })
        .addCase(completeTodoAsync.fulfilled, (state, action) => {
            return {
                ...state,
                fetchTodo: true
            }
        })
    }
});

// Destructure and export plain action creators
export const {
    createTodo,
    editTodo,
    updateTodo,
    deleteTodo,
    clickAdd,
    setActive,
    discardChanges
} = todoSlice.actions;

export default todoSlice.reducer;

