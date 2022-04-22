import { configureStore } from '@reduxjs/toolkit'
import timerReducer from "./slice/timerSlice"
import todosReducer from './slice/todoSlice'
import authReducer from "./slice/authSlice"
import { checkTokenExpirationMiddleware } from './checkTokenExpirationMiddleware';

const soundsMiddleware = require('redux-sounds');
// Our soundsData is an object. The keys are the names of our sounds.
const soundsData = {
  // If no additional configuration is necessary, we can just pass a string  as the path to our file.
  alarm: require("../other/alarm.mp3")
};

// Pre-load our middleware with our sounds data.
const loadedSoundsMiddleware = soundsMiddleware(soundsData);


export const store = configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([loadedSoundsMiddleware]),
  // We should just use a HOC to check if the token is valid every time the route changes.
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([loadedSoundsMiddleware, checkTokenExpirationMiddleware]),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {timer: timerState, todos: todosState, auth: authState}
export type AppDispatch = typeof store.dispatch