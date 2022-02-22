import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { validateLoginForm } from '../other/validation';

function Login(props, { setToken }) {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        username: "",
        password: "",
    });
    // console.log(data);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        console.log(data);
        setErrors(validateLoginForm(data));
        setIsSubmitting(true);
    }
    
    const handleChange = e => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }
    
    useEffect(() => {
        if (isSubmitting && Object.keys(errors).length === 0) {
            // dispatch();
            console.log("Submitting login");
        }
    }, [dispatch, isSubmitting, errors]);

    return (
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <label className='login-label'>Username</label>
                <input 
                    className="form-input" 
                    id="username" 
                    name="username" 
                    defaultValue={data.username} 
                    onChange={handleChange}
                    placeholder="Username"
                />
                {errors.username && <p className="input-error">{errors.username}</p>}

                <label className='login-label'>Password</label>
                <input 
                    className="form-input" 
                    id="password" 
                    name="password" 
                    defaultValue={data.password} 
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                />
                {errors.password && <p className="input-error">{errors.password}</p>}

                <button className="round-button sign-in-button" type="submit" >Log In</button>
            </form>
    )
}

export default Login;