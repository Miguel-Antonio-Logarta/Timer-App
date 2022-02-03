import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { discardChanges, createTodoAsync, updateTodoAsync } from "../redux/todoSlice";
import moment from 'moment';

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

function formValidation({validateData}) {
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
    return {};
}