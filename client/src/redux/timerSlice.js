import { createSlice } from "@reduxjs/toolkit";

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
        break: false,
        skipped: false,
        playSound: false,
    },
    reducers: {
        tick(state, action) {
            // Subtracts 1000 milliseconds (1 second) from the current time.
            state.currentTime -= 1000;

            if (state.currentTime > 0) {
                return;
            }

            state.playSound = true;
            state.paused = true;
            if (state.currentInterval === state.longBreakInterval && !state.break) {
                state.currentTime = state.longBreak;
                state.currentInterval = 0;
                state.break = true;
            } else if (!state.break) {
                state.currentTime = state.shortBreak;
                state.break = true;
            } else {
                state.currentTime = state.pomodoro;
                state.currentInterval += 1;
                state.break = false;
            }
            // When the timer reaches 0. Set value of timer
            // if (state.currentTime <= 0) {
            //     state.playSound = true;
            //     state.paused = true;
            //     if (state.currentInterval === state.longBreakInterval && !state.break) {
            //         state.currentTime = state.longBreak;
            //         state.currentInterval = 0;
            //         state.break = true;
            //     } else if (!state.break) {
            //         state.currentTime = state.shortBreak;
            //         state.break = true;
            //     } else {
            //         state.currentTime = state.pomodoro;
            //         state.currentInterval += 1;
            //         state.break = false;
            //     }
            // }
        },
        switchTimer(state, action) {
            state.paused = !state.paused;
        },
        skipTimer(state, action) {
            state.currentTime = 0;
        },
        setTimer(state, action) {
            state.currentTime = action.payload;
            state.paused = true;
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