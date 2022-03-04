import React, { useState, useEffect } from "react";
import { MdDelete, MdEditCalendar } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { discardChanges, createTodoAsync, updateTodoAsync } from "../redux/todoSlice";
import { convertToHMS } from "../other/utilities";
import { validateEditableData } from "../other/validation";

function TodoItemEditable({todoData}) {
    const { loggedIn } = useSelector((state) => state.user);

    // Props data is yyyy-mm-dd, props timeLeft is an int representing milliseconds
    const [data, setData] = useState({
        id: todoData.id ? todoData.id : null,
        title: todoData.title ? todoData.title : null,
        description: todoData.description ? todoData.description : null,
        dueDate: todoData.dueDate ? todoData.dueDate : null,
        timeLeft: todoData.timeLeft ? todoData.timeLeft : null,
        createdOn: todoData.createdOn ? todoData.createdOn : null,
        completed: todoData.completed ? todoData.completed : false,
        ...convertToHMS(todoData.timeLeft ? todoData.timeLeft: 0)      // Calculates values for keys "hrs", "mins", "secs" 
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    
    const handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();               
        setErrors(validateEditableData(data));     
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            if (data.id) {
                const { hrs, mins, secs, ...submissionData } = data;
                dispatch(updateTodoAsync(submissionData));
            }
            else {
                dispatch(createTodoAsync(data));
            }
            setIsSubmitting(false);
        }
    }, [errors, isSubmitting, data, dispatch]);

    return(
        <div className="todo-edit">
                <h3 className="todo-edit-title">{data.id === null ? "Make a new todo" : "Update the todo"}</h3>
                <form onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="task-title">Todo:</label>
                    <div className="task-title-input">
                        <input 
                            id="task-title" 
                            className="form-input" 
                            name="title" 
                            placeholder="Example: Read my chemistry book, code for 10 minutes..." 
                            defaultValue={data.title} 
                            onChange={handleChange}
                        />
                        {errors.title && <p className="input-error">{errors.title}</p>}
                    </div>
                    
                    <label className="form-label" htmlFor="description">Description:</label>
                    <div className="task-description-input">
                        <textarea 
                            id="description" 
                            name="description" 
                            className="form-input" 
                            defaultValue={data.description} 
                            placeholder="Description"
                            onChange={handleChange}
                        />
                        {errors.description && <p className="input-error">{errors.description}</p>}
                    </div>

                    <label className="form-label" htmlFor="time-hrs">Time:</label>
                    <div className="specify-time">
                        <label className="label-hidden" htmlFor="time-hrs" >Hours:</label>
                        <label className="label-hidden" htmlFor="time-min" >minutes:</label>
                        <label className="label-hidden" htmlFor="time-sec" >seconds:</label>
                        <input 
                            className="form-input label-hrs" 
                            id="time-hrs" 
                            name="hrs" 
                            defaultValue={data.hrs} 
                            onChange={handleChange}
                            placeholder="hrs"
                        />
                        <input 
                            className="form-input label-min" 
                            id="time-min" 
                            name="mins" 
                            defaultValue={data.mins} 
                            onChange={handleChange}
                            placeholder="mins"
                        />
                        <input 
                            className="form-input label-sec" 
                            id="time-sec" 
                            name="secs" 
                            defaultValue={data.secs} 
                            onChange={handleChange}
                            placeholder="secs"
                        />
                        <label className="form-label label-due-date" htmlFor="due-date">Due Date:</label>
                        <input 
                            className="form-input input-due-date" 
                            id="due-date" 
                            name="dueDate"
                            type="date"
                            defaultValue={data.dueDate}
                            onChange={handleChange}
                         />
                        {errors.time && <p className="input-error error-time">{errors.time}</p>}
                        {errors.dueDate && <p className="input-error error-due-date">{errors.dueDate}</p>}
                    </div>
                    
                    <div className="form-buttons">
                        <button type="submit" className={`round-button ${!loggedIn && "button-disabled"}`} disabled={!loggedIn}><MdEditCalendar size="24px"/><span>Save</span></button>
                        <button type="button" onClick={() => dispatch(discardChanges(data))} className="round-button" name="Delete">
                            <MdDelete size="24px"/><span>{data.id === null ? "Delete" : "Discard Changes"}</span>
                        </button>
                    </div>
                </form>
            </div>
    );
}

export default TodoItemEditable;