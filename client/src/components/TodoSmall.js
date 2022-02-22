import React from 'react';
import { useSelector } from 'react-redux';
import { MdDone } from "react-icons/md";
import { convertToHMSString } from '../other/utilities';

function TodoSmall() {
    const { activeTodo } = useSelector((state) => state.todos);
    // const todo = todos[0];
    // const todo = useSelector((state) => state.todos)
    const timeDisplay = convertToHMSString(activeTodo.timeLeft);
    
    if (Object.keys(activeTodo).length === 0) {
        return null;
    } else {
        return (
            <div className="remaining-todos">
                <div className="left-portion">
                    <div className="upper-portion">
                        <h3>Task: {activeTodo.title}</h3>
                        <span>Time Left: <b>{timeDisplay}</b></span>
                    </div>
                    <div className="lower-portion">
                        <p>{activeTodo.description}</p>
                    </div>
                </div>
                <div className="right-portion">
                    {/* <button className="check-button">Complete</button> */}
                    <div  className=""><button ><MdDone className="no-events" size="32px"/></button></div>
                </div>
            </div>
        );
    }
}

export default TodoSmall;
