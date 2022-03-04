import { createSlice } from "@reduxjs/toolkit";
import { convertToHMSString } from "../other/utilities";
import { POMODORO, SHORT_BREAK, LONG_BREAK } from "../other/constants";

export const timerSlice = createSlice({
    name: "timer",
    initialState: {
        paused: true,
        // currentTime: 3*60*60*1000,
        currentTime: 25*60*1000,
        pomodoro: 25*60*1000,
        longBreak: 15*60*1000,
        shortBreak: 5*60*1000,
        longBreakInterval: 3,
        currentInterval: 0,
        breakTime: false,
        skipped: false,
        playSound: false,
        currentIntervalName: POMODORO
    },
    reducers: {
        tick(state, action) {
            // Subtracts 1000 milliseconds (1 second) from the current time.
            state.currentTime -= 1000;
            document.title = `${convertToHMSString(state.currentTime)} - Timers`;

            if (state.currentTime > 0) {
                return;
            }

            state.playSound = true;
            state.paused = true;
            document.title = `Ring!!! - Timers`;

            if (state.currentInterval === state.longBreakInterval && !state.breakTime) {
                state.currentTime = state.longBreak;
                state.currentInterval = 0;
                state.breakTime = true;
                state.currentIntervalName = LONG_BREAK;
            } else if (!state.breakTime) {
                state.currentTime = state.shortBreak;
                state.breakTime = true;
                state.currentIntervalName = SHORT_BREAK;
            } else {
                state.currentTime = state.pomodoro;
                state.currentInterval += 1;
                state.breakTime = false;
                state.currentIntervalName = POMODORO;
            }
        },
        switchTimer(state, action) {
            state.paused = !state.paused;
        },
        skipTimer(state, action) {
            state.currentTime = 0;
        },
        setTimer(state, action) {
            state.currentTime = action.payload.time;
            state.currentIntervalName = action.payload.intervalName;
            state.paused = true;
            // state.currentTime = action.payload;
            // // state.currentInterval = 0;
            // state.paused = true;
        },
        setPlaySound(state, action) {
            state.playSound = action.payload;
        }
    }
});

export const {
    tick,
    switchTimer,
    skipTimer,
    setTimer,
    setPlaySound
} = timerSlice.actions;

export default timerSlice.reducer;