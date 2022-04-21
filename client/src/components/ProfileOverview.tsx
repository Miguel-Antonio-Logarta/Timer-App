import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { logOut } from "../state/slice/authSlice";

const ProfileOverview: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		// Dispatch an action to get user info from user/me
	}, []);

	return (
		<div className="profile">
			<Outlet />
			<h2>Welcome {user?.username ?? ""}!</h2>
			{/* <div className="profile-picture" style={profileImageStyling}></div> */}
			<div className="user-info">
				<p>Email: insert email here</p>
				<p>Joined: insert date joined here</p>
			</div>
			<Link to="changePassword">
				<button className="profile-button blue-button">Change Password</button>
			</Link>
			<Link to="changeEmail">
				<button className="profile-button blue-button">Change Email</button>
			</Link>
			<button
				onClick={() => dispatch(logOut())}
				className="profile-button blue-button"
			>
				Logout
			</button>
		</div>
	);
};

export default ProfileOverview;
