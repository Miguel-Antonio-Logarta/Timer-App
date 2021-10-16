import React from "react";
import {MdTimer, MdAccountCircle, MdSettings, MdEventNote} from "react-icons/md";
import NavItems from "./NavItems";

class Navbar extends React.Component {
    // Home leads you back to the timer
    // Todos opens the todo lists on the sidebar
    // Settings also opens a sidebar where you can adjust the settings
    render() {
        return (
            <header>
                <div className="inner-header">
                    <h1 className="brand">Timer</h1>
                    <nav className="nav-menu">
                        <ul className="nav-links">
                            <NavItems title="Home" toggle={this.props.showSettingsWindow} icon={<MdTimer size="24px"/>} />
                            <NavItems title="To-dos" toggle={this.props.showSettingsWindow} icon={<MdEventNote size="24px"/>} />
                            <NavItems title="Settings" toggle={this.props.showSettingsWindow} icon={<MdSettings size="24px"/>} />
                            <NavItems title="User" toggle={this.props.showStatsWindow} icon={<MdAccountCircle size="24px"/>} />
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;