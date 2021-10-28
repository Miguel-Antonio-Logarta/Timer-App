import moment from 'moment';

const initialState = {
    paused: true,
    currentTime: moment.duration(25*60*1000), // Sets a 25 minutes counter in milliseconds
    // currentTime: moment.duration(10*1000),
    pomodoro: moment.duration(25*60*1000),
    long_break: moment.duration(15*60*1000),
    short_break: moment.duration(5*60*1000),
    ring: false
}

const TimerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TICK':
            // Add a feature where it will only tick if the timer is above zero.
            const isZero = state['currentTime'].as('milliseconds') <= 0; 
            const nextTime = moment.duration(state['currentTime'].asMilliseconds() - 1000);
            if (!state['paused'] && !isZero)
            {
                return {...state, currentTime: nextTime};
            }
            else {
                return {...state, paused: true};

                // if (isZero && !this.state.ring) {
                //     this.playSound();
                //     this.setState({ring: true});
                // }
            }
        case 'SET_TIMER':
            return {
                ...state,
                paused: true,
                currentTime: action.payload
            };
        case 'FLIP_TIMER':
            return {
                ...state,
                paused: !state['paused']
            }
        case 'SKIP_TIMER':
            return {
                ...state,
                currentTime: moment.duration(0)
            }
        default:
            return state;
    }
};

export default TimerReducer;