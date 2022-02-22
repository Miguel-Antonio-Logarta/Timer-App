import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { validateSignUpForm } from '../other/validation';

function SignUp() {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        retypePassword: "",
    });

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(data);
        setErrors(validateSignUpForm(data));
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
        }
    }, [dispatch, isSubmitting, errors]);

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up!</h3>

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

            <label className='login-label'>Email</label>
            <input 
                className="form-input" 
                id="email" 
                name="email" 
                defaultValue={data.email} 
                onChange={handleChange}
                placeholder="Email"
                type="email"
            />
            {errors.email && <p className="input-error">{errors.email}</p>}

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

            <label className='login-label'>Retype password</label>
            <input 
                className="form-input" 
                id="retype-password" 
                name="retypePassword" 
                defaultValue={data.retypePassword} 
                onChange={handleChange}
                placeholder="Retype password"
                type="password"
            />
            {errors.retypePassword && <p className="input-error">{errors.retypePassword}</p>}

            <button className="round-button sign-in-button" type="submit" >Sign up</button>
        </form>
)
}

export default SignUp