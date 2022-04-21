import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignUpFormData, SignUpFormErrors } from "../../other/types";
import { validateSignUp } from "../../other/utilities";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { clearErrors, signUp } from "../../state/slice/authSlice";

// Email should be optional

interface Props {

}

const SignUpForm: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const { serverErrors } = useAppSelector((state) => state.auth);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [data, setData] = useState<SignUpFormData>({
		username: "",
		email: "",
		password: "",
		retypePassword: "",
	});
	const [errors, setErrors] = useState<SignUpFormErrors>({
		username: "",
		email: "",
		passwordUppercase: "",
		passwordLowercase: "",
		passwordNumber: "",
		passwordSpecial: "",
		passwordLength: "",
		retypePassword: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrors(validateSignUp(data));
		setSubmitting(true);
	};

	useEffect(() => {
		if (Object.values(errors).every((error) => error === "") && submitting) {
			dispatch(signUp(data));
			setSubmitting(false);
		}
	}, [dispatch, errors, submitting, data]);

	useEffect(() => {
		return () => {
			dispatch(clearErrors());
		};
	}, [dispatch]);

	return (
		<>
			<h2>Sign Up</h2>
			<form className="login-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username" className="small-radius">
						Username
					</label>
					<input
						name="username"
						onChange={handleChange}
						className="small-radius"
					/>
					<span className="error-message">{errors.username}</span>
					<span className="error-message">
						{serverErrors.signUp.username ? serverErrors.signUp.username : ""}
					</span>
				</div>

				<div className="form-group">
					<label htmlFor="email" className="small-radius">
						Email
					</label>
					<input
						name="email"
						onChange={handleChange}
						className="small-radius"
					/>
					<span className="error-message">{errors.email}</span>
					<span className="error-message">
						{serverErrors.signUp.email ? serverErrors.signUp.email : ""}
					</span>
				</div>

				<div className="form-group">
					<label htmlFor="password" className="small-radius">
						Password
					</label>
					<input
						name="password"
						type="password"
						onChange={handleChange}
						className="small-radius"
					/>
					<div className="small-text">
						<span>A password needs:</span>
						<ul>
							<li className={errors.passwordNumber ? `error-message` : ""}>
								1 number
							</li>
							<li className={errors.passwordUppercase ? `error-message` : ""}>
								1 uppercase letter
							</li>
							<li className={errors.passwordLowercase ? `error-message` : ""}>
								1 lowercase letter
							</li>
							<li className={errors.passwordSpecial ? `error-message` : ""}>
								1 special character: @$!%*?&amp;
							</li>
							<li className={errors.passwordLength ? `error-message` : ""}>
								At least 6 characters
							</li>
						</ul>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="retypePassword" className="small-radius">
						Retype Password
					</label>
					<input
						name="retypePassword"
						type="password"
						onChange={handleChange}
						className="small-radius"
					/>
					<span className="error-message">{errors.retypePassword}</span>
				</div>
				<div className="form-group">
					{/* Empty group for styling reasons... */}
				</div>
				<button className="blue-button" type="submit">
					Sign Up
				</button>
			</form>
			<Link to="../login" className="underline-link">
				Or Log In Here!
			</Link>
		</>
	);
};

export default SignUpForm;
