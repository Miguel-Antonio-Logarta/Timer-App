import React from "react";
import {MdTimer, MdAccountCircle, MdSettings, MdEventNote} from "react-icons/md";
import NavItems from "./NavItems";

class Navbar extends React.Component {
    // Next time I think we can turn the nav links into components. They all do the same thing
    // Home leads you back to the timer
    // Todos opens the todo lists on the sidebar
    // Settings also opens a sidebar where you can adjust the settings
    // Each nav link has an icon
    constructor(props) {
        super(props);
        this.state = {

        }
    }
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
                            {/* <li className="nav-item"><a href="#"><MdTimer size="24px"/><span>Home</span></a></li> */}
                            {/* <li className="nav-item"><a href="#"><MdEventNote size="24px"/><span>To-dos</span></a></li>
                            <li className="nav-item"><a href="#"><MdSettings size="24px"/><span>Settings</span></a></li>
                            <li className="nav-item"><a href="#"><MdAccountCircle size="24px"/><span>User</span></a></li> */}
                            
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Navbar;