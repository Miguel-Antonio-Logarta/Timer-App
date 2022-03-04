import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserMe, logout } from '../redux/userSlice';

function Profile() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(getUserMe())
    }, [dispatch])

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