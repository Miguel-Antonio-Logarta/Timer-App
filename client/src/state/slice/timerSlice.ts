import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { convertToHMSString } from "../../other/utilities";
import type { RootState } from "../store";
import { intervalNames } from "../../other/types";
import { createAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

let timer: NodeJS.Timer;

export const startTimer = (
	ms: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return (dispatch, getState) => {
		clearInterval(timer); // Clear any previous timer that was set.
		dispatch(playTimer());

		timer = setInterval(() => {
			const { paused, remainingTime } = getState().timer;

			if (!paused) {
				dispatch(tick(ms));
			}

			if (remainingTime <= 0) {
				dispatch(pauseTimer());
				dispatch(alarmSound());
				dispatch(findNextInterval());
				clearInterval(timer);
			}
		}, ms);
	};
};

export const stopTimer = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return (dispatch, getState) => {
		clearInterval(timer);
		dispatch(pauseTimer());
	};
};

// Define a type for the slice state
interface timerState {
	paused: boolean;
	remainingTime: number;
	pomodoro: number;
	shortBreak: number;
	longBreak: number;
	currentInterval: intervalNames;
	pomodorosLeft: number;
}

// Define the initial state using that type
const initialState: timerState = {
	paused: true,
	remainingTime: 25 * 60 * 1000,
	pomodoro: 25 * 60 * 1000,
	shortBreak: 5 * 60 * 1000,
	longBreak: 15 * 60 * 1000,
	currentInterval: intervalNames.POMODORO,
	pomodorosLeft: 3,
};

export const alarmSound = createAction("timer/alarmSound", function prepare() {
	return {
		payload: undefined,
		meta: {
			sound: {
				play: "alarm",
			},
		},
	};
});

export const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		tick: (state, action: PayloadAction<number>) => {
			state.remainingTime -= action.payload;
			document.title = `${convertToHMSString(state.remainingTime)} - Timers`;

			if (state.remainingTime > 0) {
				return;
			}

			state.paused = true;
			document.title = "Ring!!! - Timers";
		},
		findNextInterval: (state) => {
			switch (state.currentInterval) {
				case intervalNames.POMODORO:
					state.pomodorosLeft -= 1;
					if (state.pomodorosLeft > 0) {
						state.remainingTime = state.shortBreak;
						state.currentInterval = intervalNames.SHORTBREAK;
					} else {
						state.remainingTime = state.longBreak;
						state.currentInterval = intervalNames.LONGBREAK;
					}
					break;
				case intervalNames.SHORTBREAK:
					state.remainingTime = state.pomodoro;
					state.currentInterval = intervalNames.POMODORO;
					break;
				case intervalNames.LONGBREAK:
					state.remainingTime = state.pomodoro;
					state.pomodorosLeft = 3;
					state.currentInterval = intervalNames.POMODORO;
					break;
				default:
					break;
			}
		},
		setTimer: (state, action: PayloadAction<intervalNames>) => {
			state.currentInterval = action.payload;
			state.paused = true;
			switch (action.payload) {
				case intervalNames.POMODORO:
					state.remainingTime = state.pomodoro;
					break;
				case intervalNames.SHORTBREAK:
					state.remainingTime = state.shortBreak;
					break;
				case intervalNames.LONGBREAK:
					state.remainingTime = state.longBreak;
					break;
				default:
					break;
			}
		},
		playTimer: (state) => {
			state.paused = false;
		},
		pauseTimer: (state) => {
			state.paused = true;
		},
		skipTimer: (state) => {
			state.remainingTime = 0;
		},
	},
});

export const {
	tick,
	setTimer,
	skipTimer,
	playTimer,
	pauseTimer,
	findNextInterval,
} = timerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default timerSlice.reducer;
