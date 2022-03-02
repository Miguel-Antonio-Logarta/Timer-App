import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserMe, logout } from '../redux/userSlice';
import Cookies from "universal-cookie"

function Profile() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserMe())
    }, [dispatch])

    const handleLogout = (e) => {
        e.preventDefault();
        const cookies = new Cookies();
        cookies.remove('user');
        dispatch(logout())
    }

    if (user) {
        return (
            <div className="user-info">
                <h3>Hello {user.username}!</h3>
                <p>Email: {user.email}</p>
                <button className='round-button' onClick={handleLogout}>Log Out</button>
            </div>
        )
    } else {
        return null;
    }
}

export default Profile