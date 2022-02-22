import moment from 'moment';
import { convertToMilliseconds } from './utilities';

export function validateEditableData(data) {
    let errors = {};

    if (data.title == null || data.title.trim().length === 0) {
        errors.title = "Please enter a todo";
    } else if (data.title.trim().length > 150) {
        errors.title = "Character limit reached. Please limit your description to 150 characters";
    }

    // Check description character limit
    if (data.description != null && data.description.length > 1500) {
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
    if (data.dueDate != null && data.dueDate.length !== 0) {
        if (!moment(data.dueDate, "YYYY-MM-DD", true).isValid()) {
            errors.dueDate="Please enter a valid date";
        }
    }

    return errors;
    
}

export function validateLoginForm(data) {
    let errors = {};

    // eslint-disable-next-line
    // const emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    // usernames are alphanumeric, but can have hyphens (-) and underscores (_) in them 
    // Usernames need to be between 6 to 30 characters long
    const usernameRe = /^[A-Za-z0-9_-]{5,29}$/;
    if (!usernameRe.test(data.username)) {
        errors.username = "Please enter a valid username";
    }

    if (data.password.length === 0) {
        errors.password = "Please enter a password";
    }

    return errors;
}

export function validateSignUpForm(data) {
    let errors = {};
    
    errors = validateLoginForm(data);
    
    const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRe.test(data.email)) {
        errors.email = "Please enter a valid email address";
    }

    // TODO: add a check for passwords
    // Passwords need to be bewteen 6 to 128 characters long
    // Passwords needs: 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character
    if (data.retypePassword !== data.password) {
        errors.retypePassword = "Your password does not match";
    }

    return errors;
}