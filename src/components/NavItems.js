import React from "react";

// <a> tag should be changed to a button now. Because it won't lead to another page and will just open a modal instead
class NavItems extends React.Component {
    render() {
        return(
            <li className="nav-item">
                <button name={this.props.name} onClick={this.props.toggle}>
                    {this.props.icon}
                    <span className="no-events">{this.props.title}</span>
                </button>
            </li>
        );
    }
}

export default NavItems;