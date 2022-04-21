import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { convertToHMSString } from '../../other/utilities'
import type { RootState } from '../store'
import { intervalNames } from "../../other/types"
import { createAction } from "@reduxjs/toolkit"

export const fetchUserWithToken = createAsyncThunk(
  'user/fetchUser',
  async (data, thunkAPI) => {
    // Send a request from the server. Authorization is taken from authHeader();
  }
);

// Define a type for the slice state
interface userState {
  
}

// Define the initial state using that type
const initialState: userState = {
  
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    func: (state, action: PayloadAction<boolean>) => {

    }
  },
})

export const { } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer