import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { camelCaseKeys, snakeCaseKeys } from "../other/utilities";
import { authHeader } from "../other/utilities";

// Also add support for anonymous sessions so that the user does not need an account to store their todos and settings

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos`, { 
        method: "GET",
        headers: {
            ...authHeader()
        }
    });
    if (response.ok) {
        const data = await response.json();
        return camelCaseKeys(data);
    } else {
        // Return an empty todo item
        return []
    }
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id) => {
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos/${id}`, { 
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        }
     });
    if (response.ok) {
        const data = await response.json();
        return camelCaseKeys(data);
    }
});

export const createTodoAsync = createAsyncThunk('todos/createTodo', async (data, { rejectWithValue }) => {
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            time_left: data.timeLeft,
            due_date: data.dueDate,
        })
    })

    if (response.ok) {
        console.log(response.status)
        const data = await response.json();
        return camelCaseKeys(data);
    } else {
        return rejectWithValue(data);
    }
})

export const updateTodoAsync = createAsyncThunk('todos/updateTodo', async (data) => {
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos/`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify(snakeCaseKeys(data))
    });
    if (response.ok) {
        const data = await response.json();
        return camelCaseKeys(data);
    }
});

export const completeTodoAsync = createAsyncThunk('todos/completeTodo', async (id) => {
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos/${id}`, { 
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
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
    const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos/`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify(snakeCaseKeys(state.todos.activeTodo))
    });

    if (response.ok) {
        const data = await response.json();
        return {
            newActiveId: id,
            OldActiveTodo: camelCaseKeys(data)
        };
    }
})

export const syncActiveTodoToDBAsync = createAsyncThunk('todos/syncActiveTodo', async (_, { getState, rejectWithValue }) => {
    const state = getState();
    if (Object.keys(state.todos.activeTodo).length === 0) {
        return {"message": "Cannot send empty active todo to database"};
    }

    const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos/`, { 
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify(snakeCaseKeys(state.todos.activeTodo))
    });

    if (response.ok) {
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
            const activeId = action.payload;
            let todoList = [];
            state.todos.forEach(todo => {
                if (todo.id === activeId) {
                    if (Object.keys(state.activeTodo).length !== 0) {
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
            if (state.activeTodo.id === action.payload.id) {
                state.activeTodo = {};
                return;
            }
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        })
        .addCase(createTodoAsync.fulfilled, (state, action) => {
            // Put it at the front since it is the newest todo
            console.log(action.payload);
            state.todos.unshift(action.payload);
            state.addClicked = false;
        })
        .addCase(createTodoAsync.rejected, (state, action) => {
            console.log("Cannot add todo, you are not logged in");
        })
        .addCase(updateTodoAsync.fulfilled, (state, action) => {
            if (state.activeTodo.id === action.payload.id) {
                state.activeTodo = action.payload;
                state.editableId = state.editableId.filter((id) => id !== action.payload.id)
                return;
            }

            // Returns negative index if not found
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[index] = action.payload;
            state.editableId = state.editableId.filter((id) => id !== action.payload.id)
        })
        .addCase(completeTodoAsync.fulfilled, (state, action) => {
            if (state.activeTodo.id === action.payload.id) {
                state.activeTodo.completed = true;
                return;
            } 

            for (let todo of state.todos) {
                if (todo.id === action.payload.id) {
                    todo.completed = true;
                    break;
                }
            }
        })
        .addCase(setActiveAsync.fulfilled, (state, action) => {
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

        })
        .addCase(syncActiveTodoToDBAsync.rejected, (state, action) => {

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

