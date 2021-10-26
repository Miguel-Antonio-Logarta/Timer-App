import React from "react";
import {MdTimer, MdAccountCircle, MdSettings, MdEventNote} from "react-icons/md";
import NavItems from "./NavItems";

class Navbar extends React.Component {
    // Home leads you back to the timer
    // Todos opens the todo lists on the sidebar
    // Settings also opens a sidebar where you can adjust the settings
    // TODO: When the user presses the logo, it should refresh the page or show the timer.
    render() {
        return (
            <header>
                <div className="inner-header">
                    <h1 className="brand">Timers</h1>
                    <span className="app-description">A productivity app</span>
                    <nav className="nav-menu">
                        <ul className="nav-links">
                            <NavItems title="Home" name="Home" toggle={this.props.handleNavButtonClick} icon={<MdTimer className="no-events" size="24px"/>} />
                            <NavItems title="To-dos" name="Todos" toggle={this.props.handleNavButtonClick} icon={<MdEventNote className="no-events" size="24px"/>} />
                            <NavItems title="Settings" name="Settings" toggle={this.props.handleNavButtonClick} icon={<MdSettings className="no-events" size="24px"/>} />
                            <NavItems title="User" name="User" toggle={this.props.handleNavButtonClick} icon={<MdAccountCircle className="no-events" size="24px"/>} />
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;