import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newPasswordFormErrors } from "../../other/types";
import { validateChangePasswordForm } from "../../other/validate";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	changePassword,
	clearErrors,
	setNewPasswordSuccess,
} from "../../state/slice/authSlice";

interface newPasswordForm {
	currentPassword: string;
	newPassword: string;
	retypeNewPassword: string;
}

interface Props {}

const ChangePasswordForm: React.FC<Props> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [submitting, setSubmitting] = useState<boolean>(false);
	const { serverErrors, changePasswordSuccess } = useAppSelector(
		(state) => state.auth
	);
	const [data, setData] = useState<newPasswordForm>({
		currentPassword: "",
		newPassword: "",
		retypeNewPassword: "",
	});
	const [errors, setErrors] = useState<newPasswordFormErrors>({
		currentPassword: "",
		newPassword: "",
		passwordSame: "",
		passwordUppercase: "",
		passwordLowercase: "",
		passwordSpecial: "",
		passwordLength: "",
		passwordNumber: "",
		retypeNewPassword: "",
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
		setErrors(validateChangePasswordForm(data));
		setSubmitting(true);
	};

	useEffect(() => {
		if (Object.values(errors).every((error) => error === "") && submitting) {
			dispatch(changePassword(data));
			setSubmitting(false);
		}
	}, [dispatch, errors, submitting, data]);

	useEffect(() => {
		return () => {
			dispatch(clearErrors());
			dispatch(setNewPasswordSuccess(false));
		};
	}, [dispatch]);

	if (changePasswordSuccess) {
		return (
			<div className="regular-form-outer">
				<h2>Change Password</h2>
				<p>Password successfully changed</p>
				<Link to="/profile/dashboard" className="underline-link">
					Go Back
				</Link>
			</div>
		);
	}
	return (
		<div className="regular-form-outer">
			<h2>Change Password</h2>
			<form className="regular-form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="currentPassword">Current Password:</label>
					<input
						name="currentPassword"
						className="small-radius"
						onChange={handleChange}
						type="password"
					/>
					<span className="error-message">{errors.currentPassword}</span>
					<span className="error-message">
						{serverErrors.changePassword.oldPassword}
					</span>
				</div>

				<div className="form-group">
					<label htmlFor="newPassword">New Password:</label>
					<input
						name="newPassword"
						className="small-radius"
						onChange={handleChange}
						type="password"
					/>
					<span className="error-message">{errors.passwordSame}</span>
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
					<span className="error-message">
						{serverErrors.changePassword.newPassword}
					</span>
				</div>

				<div className="form-group">
					<label htmlFor="retypeNewPassword">Retype New Password:</label>
					<input
						name="retypeNewPassword"
						className="small-radius"
						onChange={handleChange}
						type="password"
					/>
					<span className="error-message">{errors.retypeNewPassword}</span>
				</div>

				<div className="form-group">
					<span className="error-message"></span>
				</div>

				<button className="blue-button regular-form-button" type="submit">
					Change Password
				</button>
			</form>

			<span onClick={() => navigate(-1)} className="underline-link">
				Go Back
			</span>
		</div>
	);
};

export default ChangePasswordForm;
