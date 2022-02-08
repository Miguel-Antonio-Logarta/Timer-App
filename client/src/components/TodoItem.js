import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAddTask, MdDelete, MdDone, MdEdit } from "react-icons/md";
import { editTodo, setActive, deleteTodoAsync, completeTodoAsync } from "../redux/todoSlice";
import { convertToHMSString } from "../other/utilities";

function TodoItem(props) {
    const dispatch = useDispatch();
    const { activeId } = useSelector((state) => state.todos);
    const timeDisplay = convertToHMSString(props.timeLeft);

    return (
        <div className={`todo_item ${activeId === props.id ? "todo_active" : ""}`}>
            <h3   className="todo_title">{props.title}</h3>
            <span className="todo_time">{timeDisplay}</span>
            <p className="todo_due_date">{props.dueDate ? `Due: ${props.dueDate}` : ''}</p>
            <p    className={props.description ? "todo_description" : "hidden"}>{props.description}</p>
            <div  className="todo_complete"><button onClick={() => dispatch(completeTodoAsync(props.id))} ><MdDone className="no-events" size="32px"/></button></div>
            <div  className="todo_buttons">
                <button className="round-button" onClick={() => dispatch(editTodo(props.id))} ><MdEdit size="24px"/><span>Edit</span></button>
                <button className="round-button" onClick={() => dispatch(deleteTodoAsync(props.id))} ><MdDelete size="24px"/><span>Delete</span></button>
                <button className="round-button" onClick={() => dispatch(setActive(props.id))} ><MdAddTask size="24px"/><span>Set As Active Todo</span></button>
            </div>
        </div>
    );
}

export default TodoItem;