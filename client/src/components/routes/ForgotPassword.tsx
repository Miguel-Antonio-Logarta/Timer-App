import React from "react";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
	return (
		<div className="profile-page">
			<div className="rounded-background">
				<div className="outer-form">
					<ForgotPasswordForm />
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
