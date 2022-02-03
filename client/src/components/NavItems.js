import React from "react";

function NavItems(props) {
    return(
        <li className="nav-item">
            <button className="cursor-pointer" name={props.name} onClick={props.toggle}>
                {props.icon}
                <span className="no-events">{props.text}</span>
            </button>
        </li>
    );
}

export default NavItems;