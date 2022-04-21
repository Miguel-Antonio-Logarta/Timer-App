import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	authHeader,
	camelCaseKeys,
	getCurrentUser,
	snakeCaseKeys,
} from "../../other/utilities";
import { loginRequest, newPasswordForm, SignUpFormData } from "../../other/types";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";


export const requestLogIn = createAsyncThunk(
	"auth/requestLogIn",
	async (credentials: loginRequest, thunkAPI) => {
		try {
			let formData = new FormData();
			formData.append("username", credentials.username);
			formData.append("password", credentials.password);

			const response = await fetch(`${process.env.REACT_APP_API}/user/login`, {
				method: "POST",
				body: formData,
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

export const signUp = createAsyncThunk(
	"auth/signUp",
	async (data: SignUpFormData, thunkAPI) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(snakeCaseKeys(data)),
			});

			const responseData = await response.json();
			if (response.ok) {
				return camelCaseKeys(responseData);
			}
			// } else {
			// 	return thunkAPI.rejectWithValue(camelCaseKeys(responseData));
			// }
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
);

export const changeEmail = createAsyncThunk(
	'auth/changeEmail',
	async (email: string, thunkAPI) =>  {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/user/me/email`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					...authHeader()
				},
				body: JSON.stringify({
					email: email
				})
			});

			const responseData = await response.json();
			if (response.ok) {
				return camelCaseKeys(responseData);
			} else {
				return thunkAPI.rejectWithValue(camelCaseKeys({
					'code': response.status,
					...responseData
				}));
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
)

export const changePassword = createAsyncThunk(
	'auth/changePassword',
	async (passwordForm: newPasswordForm, thunkAPI) =>  {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/user/me/password`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					...authHeader()
				},
				body: JSON.stringify({
					old_password: passwordForm.currentPassword,
					new_password: passwordForm.newPassword
				})
			});

			const responseData = await response.json();
			if (response.ok) {
				return camelCaseKeys(responseData);
			} else {
				return thunkAPI.rejectWithValue(camelCaseKeys({
					'code': response.status,
					...responseData
				}));
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(camelCaseKeys(e.response.data));
		}
	}
)

interface serverErrors {
	login: string;
	signUp: {
		[key: string]: Object[];
	};
	changeEmail: string;
	changePassword: {
		oldPassword: string;
		newPassword: string;
	};
}

const checkValidToken = (): boolean => {
	const cookies = new Cookies();
	const user = cookies.get('user');
	if (user && user.accessToken) {
		interface Token {
			userId: number;
			username: string;
			exp: number;
			iat: number;
		}
		// Check if the token is expried.
		const token: Token = jwtDecode<Token>(user.accessToken);
		if (token.exp >= (new Date().getTime() + 1) / 1000) {
			return true;
		}
	} 
	return false;
}
// Define a type for the slice state
interface authState {
	isAuthenticated: boolean;
	isFetching: boolean;
	user: any | null;
	token: string | null;
	serverErrors: serverErrors;
	changeEmailSuccess: boolean;
	changePasswordSuccess: boolean;
}

// Define the initial state using that type
// User object could be {username: string, email: string, joined: string} 
// token is not in there since it is just stored inside a cookie
const initialState: authState = {
	isAuthenticated: checkValidToken(),
	user: null,
	token: null,
	isFetching: false,
	serverErrors: {
		login: "",
		signUp: {},
		changeEmail: "",
		changePassword: {
			oldPassword: "",
			newPassword: ""
		}
	},
	changeEmailSuccess: false,
	changePasswordSuccess: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearErrors: (state) => {
			state.serverErrors = {
				login: "",
				signUp: {},
				changeEmail: "",
				changePassword: {
					oldPassword: "",
					newPassword: ""
				}
			};
			state.isFetching = false;
		},
		logOut: (state) => {
				const cookies = new Cookies();
				cookies.remove('user');
				state.isAuthenticated = false;
				state.user = null;
		},
		// setEmailSuccess and setNewPassword... should be changed. Find a better solution
		setEmailSuccess: (state, action: PayloadAction<boolean>) => {
		  state.changeEmailSuccess = action.payload;
		},
		setNewPasswordSuccess: (state, action: PayloadAction<boolean>) => {
		  state.changePasswordSuccess = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(requestLogIn.fulfilled, (state, action) => {
				state.token = action.payload.accessToken;
				const cookies = new Cookies();
				cookies.set("user", {
					accessToken: action.payload.accessToken,
				});

				state.isAuthenticated = true;
				state.isFetching = false;
				state.user = getCurrentUser();
			})
			.addCase(requestLogIn.pending, (state, action) => {
				state.isFetching = true;
			})
			.addCase(requestLogIn.rejected, (state, action) => {
				state.serverErrors.login =
					"Login Failed. Username or password is incorrect.";
				state.isFetching = false;
				state.isAuthenticated = false;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.token = action.payload.accessToken;
				const cookies = new Cookies();
				cookies.set("user", {
					accessToken: action.payload.accessToken,
				});

				state.isAuthenticated = true;
				state.isFetching = false;
				state.user = getCurrentUser();
			})
			.addCase(signUp.pending, (state, action) => {
				state.isFetching = true;
			})
			.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
				// Might need to check this
				for (const error of action.payload.detail) {
					state.serverErrors.signUp[error.loc[1]] = error.msg;
				}
				state.isAuthenticated = false;
				state.isFetching = false;
			})
			.addCase(changeEmail.fulfilled, (state, action: PayloadAction<any>) => {
				state.user.email = action.payload;
				state.changeEmailSuccess = true;
			})
			.addCase(changeEmail.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload.code === 409) {
					state.serverErrors.changeEmail = "Your new email cannot be your old email";					
				} else {
					state.serverErrors.changeEmail = action.payload.detail;
				}
			})
			.addCase(changePassword.fulfilled, (state, action: PayloadAction<any>) => {
				state.changePasswordSuccess = true;
			})
			.addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
				if (action.payload.code === 401) {
					state.serverErrors.changePassword.oldPassword = action.payload.detail
				} else if (action.payload.code === 409) {
					state.serverErrors.changePassword.newPassword = action.payload.detail
				}
			})
	},
});

export const { clearErrors, logOut, setEmailSuccess, setNewPasswordSuccess } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer;
