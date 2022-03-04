import React from "react";
import { MdTimer, MdAccountCircle, MdEventNote } from "react-icons/md";
import { useDispatch } from "react-redux";
import NavItems from "./NavItems";
import { SHOW_HOME, SHOW_TODOS, SHOW_USER  } from "../other/constants";
import { showComponent } from "../redux/navbarSlice";

function Navbar(props) {
    const dispatch = useDispatch();

    return (
        <header>
            <div className="inner-header">
                <h1 className="brand">Timers</h1>
                <span className="app-description">A productivity app</span>
                <nav className="nav-menu">
                    <ul className="nav-links">
                        <NavItems text="Home" name="Home" 
                            toggle={() => dispatch(showComponent(SHOW_HOME))} icon={<MdTimer className="no-events" size="24px"/>} />
                        <NavItems text="To-dos" name="Todos" 
                            toggle={() => dispatch(showComponent(SHOW_TODOS))} icon={<MdEventNote className="no-events" size="24px"/>} />
                        {/* <NavItems text="Settings" name="Settings" 
                            toggle={() => dispatch(showComponent(SHOW_SETTINGS))} icon={<MdSettings className="no-events" size="24px"/>} /> */}
                        <NavItems text="User" name="User" 
                            toggle={() => dispatch(showComponent(SHOW_USER))} icon={<MdAccountCircle className="no-events" size="24px"/>} />
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;