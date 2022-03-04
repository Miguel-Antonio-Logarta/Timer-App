import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAddTask, MdDelete, MdDone, MdEdit } from "react-icons/md";
import { editTodo, setActive, deleteTodoAsync, completeTodoAsync, setActiveAsync } from "../redux/todoSlice";
import { convertToHMSString } from "../other/utilities";
import TodoItemEditable from "./TodoItemEditable";

function TodoItem({todoData}) {
    const dispatch = useDispatch();
    const { activeTodo, editableId } = useSelector((state) => state.todos);
    const isActive = todoData.id === activeTodo.id;
    let timeDisplay = convertToHMSString(todoData.timeLeft);

    const handleActiveClick = () => {
        if (Object.keys(activeTodo).length !== 0) {
            dispatch(setActiveAsync(todoData.id));
        } else {
            dispatch(setActive(todoData.id));
        }
    }

    if (editableId.includes(todoData.id)) {
        return (
            <TodoItemEditable key={todoData.id} todoData={todoData} />
        );
    } else {
        return (
            <div className={`todo_item ${isActive ? "todo_active" : ""} ${todoData.completed ? "todo_completed" : ""}`}>
                <h3   className="todo_title">{todoData.title}{/*<br /> {`Id: ${todoData.id}, created: ${todoData.createdOn}`}*/}</h3>
                <span className="todo_time">{timeDisplay}</span>
                <p className="todo_due_date">{todoData.dueDate ? `Due: ${todoData.dueDate}` : ''}</p>
                <p    className={todoData.description ? "todo_description" : "hidden"}>{todoData.description}</p>
                <div  className="todo_complete"><button onClick={() => dispatch(completeTodoAsync(todoData.id))} ><MdDone className="no-events" size="32px"/></button></div>
                <div  className="todo_buttons">
                    <button className="round-button" onClick={() => dispatch(editTodo(todoData.id))} ><MdEdit size="24px"/><span>Edit</span></button>
                    <button className="round-button" onClick={() => dispatch(deleteTodoAsync(todoData.id))} ><MdDelete size="24px"/><span>Delete</span></button>
                    <button className="round-button" onClick={handleActiveClick} ><MdAddTask size="24px"/><span>Set As Active Todo</span></button>
                </div>
            </div>
        );
    }
}

export default TodoItem;