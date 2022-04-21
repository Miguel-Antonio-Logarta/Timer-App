import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmailForm } from "../../other/validate";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	changeEmail,
	clearErrors,
	setEmailSuccess,
} from "../../state/slice/authSlice";

interface Props {}

const ChangeEmailForm: React.FC<Props> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [submitting, setSubmitting] = useState<boolean>(false);
	const { serverErrors, changeEmailSuccess } = useAppSelector(
		(state) => state.auth
	);
	const [data, setData] = useState({
		email: "",
	});
	const [errors, setErrors] = useState({
		email: "",
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
		setErrors(validateEmailForm(data.email));
		setSubmitting(true);
	};

	useEffect(() => {
		if (Object.values(errors).every((error) => error === "") && submitting) {
			dispatch(changeEmail(data.email));
			setSubmitting(false);
		}
	}, [dispatch, errors, submitting, data]);

	useEffect(() => {
		// On email change success, go to a page that tells you that email has been successfully changed.
		return () => {
			dispatch(clearErrors());
			dispatch(setEmailSuccess(false));
		};
	}, [dispatch]);

	if (changeEmailSuccess) {
		return (
			<div className="regular-form-outer">
				<h2>Change Email</h2>
				<p>Your email has been changed successfully</p>
				<Link to="/profile/dashboard" className="underline-link">
					Go Back
				</Link>
			</div>
		);
	} else {
		return (
			<div className="regular-form-outer">
				<h2>Change Email</h2>
				<form className="regular-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>New Email:</label>
						<input
							name="email"
							className="small-radius"
							onChange={handleChange}
						/>
						<span className="error-message">{errors.email}</span>
						<span className="error-message">{serverErrors.changeEmail}</span>
					</div>

					<button className="blue-button" type="submit">
						Change Email
					</button>
				</form>

				<span onClick={() => navigate(-1)} className="underline-link">
					Go Back
				</span>
			</div>
		);
	}
};

export default ChangeEmailForm;
