import React from "react";
import {MdTimer, MdAccountCircle, MdSettings, MdEventNote} from "react-icons/md";
import { useDispatch } from "react-redux";
import NavItems from "./NavItems";
import { showComponent } from "../state/index";
// import { bindActionCreators } from "redux";

function Navbar(props) {
    const dispatch = useDispatch();

    // Okay so the issue has to do with binding the action creators. It sets off an issue where we need middleware like 
    // Redux Thunk. And even then, it still wouldn't work. So just import the action creator directly and wrap dispatch around it.
    // const { showComponent } = bindActionCreators(actionCreators, dispatch);
    // console.log(buttonStates);
    // dispatch(showComponent("Settings"));
    return (
        <header>
            <div className="inner-header">
                <h1 className="brand">Timers</h1>
                <span className="app-description">A productivity app</span>
                <nav className="nav-menu">
                    <ul className="nav-links">
                        <NavItems text="Home" name="Home" 
                            toggle={() => dispatch(showComponent("Home"))} icon={<MdTimer className="no-events" size="24px"/>} />
                        <NavItems text="To-dos" name="Todos" 
                            toggle={() => dispatch(showComponent("Todos"))} icon={<MdEventNote className="no-events" size="24px"/>} />
                        <NavItems text="Settings" name="Settings" 
                            toggle={() => dispatch(showComponent("Settings"))} icon={<MdSettings className="no-events" size="24px"/>} />
                        <NavItems text="User" name="User" 
                            toggle={() => dispatch(showComponent("User"))} icon={<MdAccountCircle className="no-events" size="24px"/>} />
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;