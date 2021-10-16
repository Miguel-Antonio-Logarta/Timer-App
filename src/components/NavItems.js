import React from "react";

// <a> tag should be changed to a button now. Because it won't lead to another page and will just open a modal instead
class NavItems extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <li className="nav-item">
                <button href="#" onClick={this.props.toggle}>
                    {this.props.icon}
                    <span>{this.props.title}</span>
                </button>
            </li>
        );
    }
}

export default NavItems;