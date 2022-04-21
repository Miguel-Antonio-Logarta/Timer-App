import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { authHeader, validateTodo } from "../../other/utilities";
import type { RootState } from "../store";
import {
	CompleteTodoItem,
	CreateTodoItem,
	TodoItem,
	TodoItemFormErrors,
	UpdateTodoItem,
} from "../../other/types";
import { camelCaseKeys, snakeCaseKeys } from "../../other/utilities";
import { createSelector } from "reselect";
// Create selectors for memoization
export const selectAllTodos = createSelector(
	(state: RootState) => state.todos,
	(todosState) => todosState.todos.map((todo) => todo.id)
);

// TODO: Create thunks for the following
// DONE: Fetching todo list
// DONE: Creating todo item
// DONE: Updating todo item
// DONE: Completing / "Uncompleting" todo item (Same as update, but the payload only contains id, owner, and completed boolean)
// DONE: Deleting todo item
// WIP: Updating an active todo item. (Same as update, but the payload only contains id, owner, timeSet, and timeLeft)

export const fetchTodos = createAsyncThunk(
	"todos/fetchTodos",
	async (_, thunkAPI) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/todos`, {
				method: "GET",
				headers: { ...authHeader() },
			});

			const data = await response.json();
			if (response.ok) {
				return camelCaseKeys(data);
			} else {
				return thunkAPI.rejectWithValue(camelCaseKeys(data));
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
);

export const deleteTodo = createAsyncThunk(
	"todos/deleteTodo",
	async (id: number, thunkAPI) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/todos/${id}`, {
				method: "DELETE",
				headers: {
					...authHeader(),
				},
			});

			const data = await response.json();
			if (response.ok) {
				return camelCaseKeys(data);
			} else {
				return thunkAPI.rejectWithValue(camelCaseKeys(data));
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
);

export const createTodo = createAsyncThunk(
	"todos/createTodo",
	async (todoData: CreateTodoItem, thunkAPI) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/todos`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...authHeader(),
				},
				body: JSON.stringify(snakeCaseKeys(todoData)),
			});

			const data = await response.json();
			if (response.ok) {
				return camelCaseKeys(data);
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
);

export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async (todoData: UpdateTodoItem, thunkAPI) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/todos`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					...authHeader(),
				},
				body: JSON.stringify(snakeCaseKeys(todoData)),
			});

			const data = await response.json();
			if (response.ok) {
				return camelCaseKeys(data);
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
);

export const setCompletedTodo = createAsyncThunk(
	"todos/completeTodo",
	async (todo: CompleteTodoItem, thunkAPI) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/todos/${todo.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					...authHeader(),
				},
				body: JSON.stringify({
					completed: todo.completed,
				}),
			});

			const data = await response.json();
			if (response.ok) {
				return camelCaseKeys(data);
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
);

// export const setActiveAsync = createAsyncThunk('todos/setActiveTodo', async (id, { getState }) => {
//   // When setActiveAsync is called, it will sync the current active todo with the database (save the time),
//   // Then after the response is successful, it will switch the current active todo with a new active todo
//   const state = getState();
//   const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos/`, {
//       method: "PUT",
//       headers: {
//           'Content-Type': 'application/json',
//           ...authHeader()
//       },
//       body: JSON.stringify(snakeCaseKeys(state.todos.activeTodo))
//   });

//   if (response.ok) {
//       const data = await response.json();
//       return {
//           newActiveId: id,
//           OldActiveTodo: camelCaseKeys(data)
//       };
//   }
// })

// export const syncActiveTodoToDBAsync = createAsyncThunk('todos/syncActiveTodo', async (_, { getState, rejectWithValue }) => {
//   const state = getState();
//   if (Object.keys(state.todos.activeTodo).length === 0) {
//       return {"message": "Cannot send empty active todo to database"};
//   }

//   const response = await fetch(`https://logarta-timers-server.herokuapp.com/todos/`, {
//       method: "PUT",
//       headers: {
//           'Content-Type': 'application/json',
//           ...authHeader()
//       },
//       body: JSON.stringify(snakeCaseKeys(state.todos.activeTodo))
//   });

//   if (response.ok) {
//       const data = await response.json();
//       return camelCaseKeys(data);
//   }
// })

interface todosState {
	createNewTodo: boolean;
	editingTodo: boolean;
	todos: Array<TodoItem>;
	errors: {
		form: TodoItemFormErrors;
		other: unknown;
	};
	todoToEdit: TodoItem | undefined;
	submittingForm: boolean;
}

// Define the initial state using that type
const initialState: todosState = {
	createNewTodo: false,
	todos: [],
	errors: {
		form: {
			title: "",
			description: "",
			time: "",
			dueDate: "",
		},
		other: {},
	},
	editingTodo: false,
	submittingForm: false,
	todoToEdit: undefined,
};

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		creatingNewTodo: (state, action: PayloadAction<boolean>) => {
			state.createNewTodo = action.payload;
			// Reset errors and isSubmitting
			Object.values(state.errors.form).forEach((error) => (error = ""));
			state.submittingForm = false;
		},
		editingTodo: (state, action: PayloadAction<number>) => {
			// Look through array of todos.
			state.todoToEdit = state.todos.find((todo) => todo.id === action.payload);
			state.editingTodo = true;
		},
		validateTodoForm: (state, action: PayloadAction<any>) => {
			state.errors.form = validateTodo(action.payload);
		},
		setSubmitting: (state, action: PayloadAction<boolean>) => {
			state.submittingForm = action.payload;
		},
		stopEditingTodo: (state) => {
			state.editingTodo = false;
			state.todoToEdit = undefined;
		},
		toggleCompleteTodo: (state, action: PayloadAction<number>) => {
			for (let todo of state.todos) {
				if (todo.id === action.payload) {
					todo.completed = !todo.completed;
					break;
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.todos = action.payload;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.todos = [];
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				// Put it at the front since it is the newest todo
				state.todos.unshift(action.payload);
				state.createNewTodo = false;
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				// Returns negative index if not found
				const index = state.todos.findIndex(
					(todo) => todo.id === action.payload.id
				);
				if (index >= 0) {
					state.todos[index] = action.payload;
					state.editingTodo = false;
				}
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = state.todos.filter(
					(todo) => todo.id !== action.payload.id
				);
			})
			.addCase(setCompletedTodo.fulfilled, (state, action) => {
				const index = state.todos.findIndex(
					(todo) => todo.id === action.payload.id
				);
				if (index >= 0) {
					state.todos[index].completed = action.payload.completed;
				}
			});
	},
});

export const {
	creatingNewTodo,
	editingTodo,
	validateTodoForm,
	setSubmitting,
	stopEditingTodo,
	toggleCompleteTodo,
} = todosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

// export const selectTodoIds = (state: any) => {
//   return state.todos.map((todo: TodoItem) => todo.id);
// }

export const selectTodoById = (state: todosState, id: number) => {
	return state.todos.find((todo: TodoItem) => todo.id === id)!;
};

export const selectTodoIds = createSelector(
	// First, pass one or more "input selector" functions:
	(state: RootState) => state.todos.todos,
	// Then, an "output selector" that receives all the input results as arguments
	// and returns a final result value
	(todos) => {
		const arr = todos.map((todo: TodoItem) => todo.id);
		console.log(arr);
		return arr;
	}
);

export default todosSlice.reducer;
