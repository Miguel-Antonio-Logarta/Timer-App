import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {

}

const ForgotPasswordForm: React.FC<Props> = () => {
	const [data, setData] = useState({
		email: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		// Check if input is actually an email.
		// setErrors(validateEmail(data));
		// dispatch(forgotPassword(data));
	};

	return (
		<>
			<h2>Forgot Password</h2>
			<p className="center-text">
				Enter your email to recover your password. Unfortunately, if your
				account is not associated with an email, we cannot recover it.
			</p>

			<form className="login-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email" className="small-radius">
						Email
					</label>
					<input
						name="email"
						onChange={handleChange}
						className="small-radius"
					/>
					<span className="error-message"></span>
				</div>

				<button className="blue-button" type="submit">
					Recover Password
				</button>
			</form>
			<Link to="../login" className="underline-link">
				Or Back to Log In Here!
			</Link>
		</>
	);
};

export default ForgotPasswordForm;
