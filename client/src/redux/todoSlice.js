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
        return camelCaseKeys(data);
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
        return camelCaseKeys(data);
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
        return camelCaseKeys(data);
    } 
})

export const updateTodoAsync = createAsyncThunk('todos/updateTodo', async (data) => {
    // Clean up the request body
    // This function should not have to clean up the request body. It is up to the 
    // user who calls this function to clean it before passing it to the function
    // const { hrs, mins, secs, newTodo, active, ...requestBody } = data;
    const response = await fetch(`http://127.0.0.1:8000/todos/${data.id}`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(snakeCaseKeys(requestBody))
        body: JSON.stringify(snakeCaseKeys(data))
    });
    if (response.ok) {
        const data = await response.json();
        return camelCaseKeys(data);
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
        return camelCaseKeys(data);
    }
})

export const setActiveAsync = createAsyncThunk('todos/setActiveTodo', async (id, { getState }) => {
    // When setActiveAsync is called, it will sync the current active todo with the database (save the time),
    // Then after the response is successful, it will switch the current active todo with a new active todo
    const state = getState();
    console.log("setActiveAsync");
    console.log(state);
    console.log(JSON.stringify(snakeCaseKeys(state.todos.activeTodo)));

    const response = await fetch(`http://127.0.0.1:8000/todos/${state.todos.activeTodo.id}`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(snakeCaseKeys(state.todos.activeTodo))
    });

    if (response.ok) {
        console.log("Confirmed");
        const data = await response.json();
        return {
            newActiveId: id,
            OldActiveTodo: camelCaseKeys(data)
        };
    }
})

export const syncActiveTodoToDBAsync = createAsyncThunk('todos/syncActiveTodo', async (_, { getState }) => {
    // Add error handling for when active todo is empty
    const state = getState();
    const timeSubmitted = state.todos.activeTodo.timeLeft;
    console.log(timeSubmitted);
    console.log(state);
    if (Object.keys(state.todos.activeTodo).length === 0) {
        return {"message": "Cannot send empty active todo to DB"};
    }

    const response = await fetch(`http://127.0.0.1:8000/todos/${state.todos.activeTodo.id}`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(snakeCaseKeys(state.todos.activeTodo))
    });

    if (response.ok) {
        console.log(`Time left: ${timeSubmitted}`);
        const data = await response.json();
        return camelCaseKeys(data);
    }
})

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        activeTodo: {},
        addClicked: false,
        editableId: [],
        activeId: 5,
        fetchTodo: true,
        activeTimeLeft: 0
    },
    reducers: {
        setActiveTimeLeft(state, action) {
            // state.activeTimeLeft = action.payload;
            console.log(action.payload);
            state.activeTodo.timeLeft = action.payload;
        },
        tickActiveTimeLeft(state, action) {
            if (Object.keys(state.activeTodo).length === 0 ) {
                return;
            }

            if (state.activeTodo.timeLeft > 0) {
                state.activeTodo.timeLeft = state.activeTodo.timeLeft - 1000;
            } else {
                state.activeTodo.timeLeft = 0;
            }
        },
        editTodo(state, action) {
            state.editableId.push(action.payload);
        },
        clickAdd(state, action) {
            state.addClicked = action.payload;
        },
        setActive(state, action) {
            // const activeId = action.payload;
            // let todoList = [];
            // camelCaseKeys(state.todos).forEach(todo => {
            //     if (todo.id === activeId) {
            //         // Make the active todo the first element of the array
            //         todoList.unshift(todo);
            //     } else {
            //         todoList.push(todo);
            //     }
            // });

            // state.activeTimeLeft = todoList[0].timeLeft;
            // state.activeId = action.payload;
            // state.todos = [...todoList];
            // We won't be needing this anymore.
            const activeId = action.payload;
            let todoList = [];
            state.todos.forEach(todo => {
                if (todo.id === activeId) {
                    if (Object.keys(state.activeTodo).length !== 0) {
                    // if (state.activeTodo !== null) {
                        todoList.push(state.activeTodo);
                    }
                    state.activeTodo = todo;
                } else {
                    todoList.push(todo);
                }
            });
            state.todos = [...todoList];
            state.fetchTodo = false;
        },
        discardChanges(state, action) {
            if (action.payload.id === null) {
                state.addClicked = false;
            } else {
                state.editableId = state.editableId.filter((id) => id !== action.payload.id);
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodosAsync.fulfilled, (state, action) => {
            // Approach 1: Store active todo in a separate state
            let todoList = [];
            action.payload.forEach(todo => {
                if (todo.id === state.activeTodo.id) {
                    // Updates the active todo
                    // Maybe check if the active todo is not null before replacing it.
                    state.activeTodo = todo;
                } else {
                    todoList.push(todo);
                }
            });

            state.todos = [...todoList];
            state.fetchTodo = false;
            // // Approach 2: Put active todo as the first element in the todoList
            // // What if the todo with the id is not found?
            // let todoList = [];
            // camelCaseKeys(action.payload).forEach(todo => {
            //     if (todo.id === state.activeId) {
            //         // Make the active todo the first element of the array
            //         todoList.unshift(todo);
            //     } else {
            //         todoList.push(todo);
            //     }
            // });

            // if (state.activeTimeLeft > todoList[0].timeLeft) {
            //     state.activeTimeLeft = todoList[0].timeLeft;
            // }
            // state.todos = [...todoList];
            // state.fetchTodo = false;
        })
        .addCase(deleteTodoAsync.fulfilled, (state, action) => {
            console.log(action.payload); 
            if (state.activeTodo.id === action.payload.id) {
                state.activeTodo = null;
                return;
            }
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
            // return {
            //     ...state, 
            //     fetchTodo: true
            // }
        })
        .addCase(createTodoAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            // state.todos.push(action.payload);
            // Put it at the front since it is the newest todo
            state.todos.unshift(action.payload);
            state.addClicked = false;
            // return {
            //     ...state, 
            //     addClicked: false, 
            //     fetchTodo: true
            // }
        })
        .addCase(updateTodoAsync.fulfilled, (state, action) => {
            // This method is fucked
            console.log(action.payload);
            console.log(state.activeTodo.id);
            if (state.activeTodo.id === action.payload.id) {
                console.log("Updating active todo");
                state.activeTodo = action.payload;
                state.editableId = state.editableId.filter((id) => id !== action.payload.id)
                return;
            }

            // Returns negative index if not found
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            // console.log(index);
            // let newTodos = [...state.todos];
            // console.log(newTodos);
            // console.log(newTodos[index]);
            // newTodos[index] = action.payload;

            state.todos[index] = action.payload;
            state.editableId = state.editableId.filter((id) => id !== action.payload.id)
            // return {
            //     ...state,
            //     editableId: state.editableId.filter((id) => id !== action.payload.id),
            //     fetchTodo: true
            // }
        })
        .addCase(completeTodoAsync.fulfilled, (state, action) => {
            console.log(action.payload.id);
            if (state.activeTodo.id === action.payload.id) {
                state.activeTodo.completed = true;
                return;
            } 

            for (let todo of state.todos) {
                // console.log(todo);
                if (todo.id === action.payload.id) {
                    // console.log("match!");
                    todo.completed = true;
                    break;
                }
            }
            // return {
            //     ...state,
            //     fetchTodo: true
            // }
        })
        .addCase(setActiveAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            // state.todos.push(action.payload.)
            // state.activeTodo = 
            console.log("Fulfilled");
            let todoList = [];
            state.todos.forEach(todo => {
                if (todo.id === action.payload.newActiveId) {
                    todoList.push(action.payload.OldActiveTodo);
                    state.activeTodo = todo;
                } else {
                    todoList.push(todo);
                }
            });
            state.todos = [...todoList];
            state.fetchTodo = false;
        })
        .addCase(syncActiveTodoToDBAsync.fulfilled, (state, action) => {
            console.log(action.payload);
        })
        .addCase(syncActiveTodoToDBAsync.rejected, (state, action) => {
            console.log(action.error);
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
    setActiveTimeLeft,
    tickActiveTimeLeft,
    discardChanges
} = todoSlice.actions;

export default todoSlice.reducer;

