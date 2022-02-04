import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../other/Data";

// If fetching fails, move todos to local storage and set synced to false
// When user has reconnected to server, sync up todos with database
// Also add support for anonymous sessions so that the user does not need an account to store their todos and settings
// When the user is not logged in, use localStorage and cookies.
// when the user is logged in, connect to the database.

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch("http://127.0.0.1:8000/todos/", { 
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
    // Id should be an int
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

export const createTodoAsync = createAsyncThunk('todos/createTodo', async (data, { rejectWithValue }) => {
    const response = await fetch(`http://127.0.0.1:8000/todos/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            timeLeft: data.timeLeft,
            dueDate: data.dueDate,
        })
    })

    if (response.ok) {
        const data = await response.json();
        return data;
    } 

    // try {
    //     const response = await fetch(`http://127.0.0.1:8000/todos/`, {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             title: data.title,
    //             description: data.description,
    //             timeLeft: data.timeLeft,
    //             dueDate: data.dueDate,
    //         })
    //     })
    //     const returnData = await response.json();
    //     return returnData;
    // } catch (err) {
    //     return rejectWithValue(err.response);
    // }

    // try {
    //   const response = await userAPI.updateById(id, fields)
    //   return response.data.user
    // } catch (err) {
    //   // Use `err.response.data` as `action.payload` for a `rejected` action,
    //   // by explicitly returning it using the `rejectWithValue()` utility
    //   return rejectWithValue(err.response.data)
    // }
    // if (response.ok) {
    //     const data = await response.json();
    //     return data;
    // } else {
    //     return rejectWithValue(err.response.payload);
    // }
})

export const updateTodoAsync = createAsyncThunk('todos/updateTodo', async (data) => {
    const response = await fetch(`http://127.0.0.1:8000/todos/${data.id}`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: data.id,
            title: data.title,
            description: data.description,
            timeLeft: data.timeLeft,
            dueDate: data.dueDate,
            completed: data.completed,
        })
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
});

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        addClicked: false,
        editableId: [],
        activeId: config.todoActiveId
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
            // Something wrong with action.payload. It is undefined.
            console.log(JSON.stringify(action.payload, undefined, 2));
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
            return { ...state, todos: action.payload.todos }
        })
        .addCase(deleteTodoAsync.fulfilled, (state, action) => {
            return { ...state, todos: action.payload.todos }
        })
        .addCase(createTodoAsync.fulfilled, (state, action) => {
            state.todos = action.payload.todos;
            state.addClicked = false
        })
        .addCase(updateTodoAsync.fulfilled, (state, action) => {
            state.editableId = state.editableId.filter((id) => id !== action.payload.editedTodoId);
            state.todos = action.payload.todos
        })
        // .addCase(fetchTodosAsync.rejected, (state, action) => {
        //     console.log("There was an error fetching the todos");
        // })
        // .addCase(deleteTodoAsync.rejected, (state, action) => {
        //     console.log("There was an error deleting the todo");
        //     console.log(action);
        // })
        // .addCase(createTodoAsync.rejected, (state, action) => {
        //     console.log("There was an error creating the todo");
        //     console.log(action);
        // })

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

