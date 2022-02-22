import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAddTask, MdDelete, MdDone, MdEdit } from "react-icons/md";
import { editTodo, setActive, deleteTodoAsync, completeTodoAsync, updateTodoAsync, setActiveTimeLeft, setActiveAsync } from "../redux/todoSlice";
import { convertToHMSString } from "../other/utilities";
import TodoItemEditable from "./TodoItemEditable";

function TodoItem({timeLeft, todoData}) {
    // When time is being subtracted, the database can track when you started and stopped the timer.
    //
    const dispatch = useDispatch();
    const { activeTodo, editableId } = useSelector((state) => state.todos);
    // const { paused, currentTime } = useSelector((state) => state.timer);
    // const [time, setTime] = useState(todoData.timeLeft);
    let timeDisplay = convertToHMSString(todoData.timeLeft);
    const isActive = todoData.id === activeTodo.id;

    // if (isActive) {
    //     timeDisplay = convertToHMSString(timeLeft);
    // }

    const handleActiveClick = () => {
        if (Object.keys(activeTodo).length !== 0) {
            dispatch(setActiveAsync(todoData.id));
        } else {
            dispatch(setActive(todoData.id));
        }
    }

    // useEffect(() => {
    //     console.log("todo moutn");
    //     return () => console.log("todo unmount");
    // }, []);
    // Listens to the timer. When the timer is running, the active todo will subtract time from its todo
    // useEffect(() => {
    //     if (!paused && isActive) {
    //         setTime((time) => {
    //             if (time > 0) {
    //                 return time - 1000;
    //             } else {
    //                 return 0;
    //             }
    //         });
    //     }
    // }, [paused, isActive, currentTime])

    // // Makes a call to the database whenever there is an update
    // useEffect(() => {
    //     if (fetchTodo && isActive) {
    //         console.log("Saving active time");
    //         dispatch(setActiveTimeLeft(time));
    //         dispatch(updateTodoAsync({timeLeft: time, ...todoData}));
    //     }

    //     // This return dispatches so many actions. It is not good
    //     // return () => {
    //     //     if (todoData.timeLeft !== time) {
    //     //         dispatch(updateTodoAsync({timeLeft: time, ...todoData}));
    //     //     }
    //     // }
    // }, [dispatch, fetchTodo, time, todoData, isActive])
    if (editableId.includes(todoData.id)) {
        return (
            <TodoItemEditable key={todoData.id} todoData={todoData} />
        );
    } else {
        return (
            <div className={`todo_item ${isActive ? "todo_active" : ""} ${todoData.completed ? "todo_completed" : ""}`}>
                <h3   className="todo_title">{todoData.title}<br /> {`Id: ${todoData.id}, created: ${todoData.createdOn}`}</h3>
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