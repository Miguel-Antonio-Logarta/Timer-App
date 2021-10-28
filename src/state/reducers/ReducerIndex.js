import { combineReducers } from "redux";
import TimerReducer from "./TimerReducer";
import NavbarReducer from "./NavbarReducer";

const reducers = combineReducers({
    Timer: TimerReducer,
    Navbar: NavbarReducer
});

export default reducers;