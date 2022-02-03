import moment from "moment";
import React, { useState, useEffect } from "react";
import { MdDelete, MdEditCalendar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { discardChanges, createTodoAsync, updateTodoAsync } from "../redux/todoSlice";

function TodoItemEditable(props) {
    function convertToHMS(milliseconds) { 
        const hrs = Math.floor(milliseconds/3600000);                       // 3600000ms in an hour
        const mins = Math.floor((milliseconds/60000)-(hrs*60));             // 60000ms in a minute. Get remaining minutes
        const secs = Math.floor((milliseconds/1000)-(hrs*3600)-(mins*60));  // 1000ms in a second. Get remaining seconds
        return { hrs, mins, secs };
    }

    function convertToMilliseconds({hrs, mins, secs}) {
        return (hrs*3600000 + mins*60000 + secs*1000);
    }

    // Props data is yyyy-mm-dd, props timeLeft is an int representing milliseconds
    const [data, setData] = useState({
        id: props.id ? props.id : null,
        title: props.title ? props.title : '',
        description: props.description ? props.description : '',
        dueDate: props.dueDate ? props.dueDate : '',
        newTodo: props.newTodo ? props.newTodo : false,
        active: props.active ? props.active : false,
        timeLeft: props.timeLeft ? props.timeLeft: 0,
        ...convertToHMS(props.timeLeft ? props.timeLeft: 0)      // Calculates values for keys "hrs", "mins", "secs" 
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
        setIsSubmitting(true);
        setErrors(validateData(data));     
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            if (data.newTodo) {
                dispatch(createTodoAsync(data));
            }
            else {
                dispatch(updateTodoAsync(data));
            }
            setIsSubmitting(false);
        }
    }, [errors, isSubmitting, data, dispatch]);

    function validateData(data) {
        let errors = {};

        // Check title validity (exists and char length <= 150)
        if (data.title.trim().length === 0) {
            errors.title = "Please enter a todo";
        } else if (data.title.trim().length > 150) {
            errors.title = "Character limit reached. Please limit your description to 150 characters";
        }

        // Check description character limit
        if (data.description.length > 1500) {
            errors.description = "Character limit reached. Please limit your description to 1500 characters";
        }

        const onlyNums = /^[0-9]*$/; // Parse input including empty fields
        if (onlyNums.test(data.hrs) && onlyNums.test(data.mins) && onlyNums.test(data.secs)) {
            if (Number(data.hrs) < 0 ||
                Number(data.mins) < 0 ||
                Number(data.secs) < 0 ||
                Number(data.mins) > 59 ||
                Number(data.secs) > 59) {
                errors.time = "Please enter a valid time that is in range";
            } else {
                data.timeLeft = convertToMilliseconds({hrs: data.hrs, mins: data.mins, secs: data.secs});
            }
        } else {
            errors.time = "Please only enter numbers";
        }

        // Check date validity
        if (data.dueDate.length !== 0) {
            if (!moment(data.dueDate, "YYYY-MM-DD", true).isValid()) {
                errors.dueDate="Please enter a valid date";
            }
        }

        return errors;
        
    }

    return(
        <div className="todo-edit">
                <h3 className="todo-edit-title">{data.newTodo ? "Make a new todo" : "Update the todo"}</h3>
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
                        <button type="submit" className="round-button"><MdEditCalendar size="24px"/><span>Save</span></button>
                        <button type="button" onClick={() => dispatch(discardChanges(data))} className="round-button" name="Delete">
                            <MdDelete size="24px"/><span>{data.newTodo ? "Delete" : "Discard Changes"}</span>
                        </button>
                    </div>
                </form>
            </div>
    );
}

export default TodoItemEditable;