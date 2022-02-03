import React, { useState } from 'react'

function UserPage() {
    const [data, setData] = useState({
        username: "",
        password: "",
        newUser: false
    });

    const handleSubmit = e => {
        e.preventDefault();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setData({
            [name]: value
        });
    }

    return (
        <div className='userpage'>
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <label className='login-label'>Username</label>
                <input 
                    className="form-input" 
                    id="username" 
                    name="username" 
                    defaultValue={data.username} 
                    onChange={handleChange}
                    placeholder="username or email"
                />
                <label className='login-label'>Password</label>
                <input 
                    className="form-input" 
                    id="password" 
                    name="password" 
                    defaultValue={data.password} 
                    onChange={handleChange}
                    placeholder="password"
                />
                <button className="round-button sign-in-button" type="submit" >Log In</button>
            </form>
            <p>Or sign up here!</p>
        </div>
    )
}

export default UserPage;
