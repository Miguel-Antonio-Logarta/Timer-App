import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import LoginForm from "../forms/LoginForm";

const Login: React.FC = () => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const location = useLocation();

	if (isAuthenticated) {
		return (
			<Navigate to="/profile/dashboard" replace state={{ from: location }} />
		);
	}

	return (
		<div className="profile-page">
			<div className="rounded-background">
				<div className="outer-form">
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
