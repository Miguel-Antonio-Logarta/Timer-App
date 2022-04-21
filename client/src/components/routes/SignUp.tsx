import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import SignUpForm from "../forms/SignUpForm";

interface Props {}

const SignUp: React.FC<Props> = () => {
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
					<SignUpForm />
				</div>
			</div>
		</div>
	);
};

export default SignUp;
