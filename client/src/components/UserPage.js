import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

function UserPage() {
    const [user, setUser] = useState('');
    const [signUp, setSignUp] = useState(false);

    return (
        <div className='userpage'>
            {signUp ? <SignUp /> : <Login />}
            <p className="sign-up" onClick={() => setSignUp(!signUp)}>Or {signUp ? "Login" : "Sign Up"} here!</p>
        </div>
    )
}

export default UserPage;
