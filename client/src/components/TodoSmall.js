import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDone } from "react-icons/md";
import { convertToHMSString } from '../other/utilities';
import { completeTodoAsync } from '../redux/todoSlice';

function TodoSmall() {
    const { activeTodo } = useSelector((state) => state.todos);
    const timeDisplay = convertToHMSString(activeTodo.timeLeft);
    const dispatch = useDispatch();
    
    if (Object.keys(activeTodo).length === 0) {
        return null;
    } else {
        return (
            <div className={`small-todo ${activeTodo.completed ? "todo_completed" : ""}`}>
                <div className="small-left">
                    <h3   className="todo_title">{activeTodo.title}{/*<br /> {`Id: ${activeTodo.id}, created: ${activeTodo.createdOn}`}*/}</h3>
                    <span className="todo_time">Time Left: {timeDisplay}</span>
                    <p className="todo_due_date">{activeTodo.dueDate ? `Due: ${activeTodo.dueDate}` : ''}</p>
                    <p    className={activeTodo.description ? "todo_description" : "hidden"}>{activeTodo.description}</p>
                </div>
                <div className='small-right todo_complete'>
                    <button onClick={() => dispatch(completeTodoAsync(activeTodo.id))} >
                        <MdDone className="no-events" size="32px"/>
                    </button>
                </div>
            </div>
        )
    }
}

export default TodoSmall;
