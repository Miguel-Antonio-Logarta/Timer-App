import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';

function UserPage() {
    const { loggedIn } = useSelector((state) => state.user);
    const [signUp, setSignUp] = useState(false);

    if (loggedIn) {
        return (
        <div className='userpage'>
            <Profile />
        </div>
        )
    } else {
        return (
        <div className='userpage'>
            {signUp ? <SignUp /> : <Login />}
            <p className="sign-up" onClick={() => setSignUp(!signUp)}>Or {signUp ? "Login" : "Sign Up"} here!</p>
        </div>
        )
    }
}

export default UserPage;
