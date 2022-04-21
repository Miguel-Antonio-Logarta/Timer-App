import {
	PasswordErrors,
	newPasswordForm,
	newPasswordFormErrors,
} from "./types";

const usernameRe = /^[A-Za-z0-9_-]{5,29}$/;
// eslint-disable-next-line
const emailRe =
	/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isUpperCaseLetter = (string: string) => /^[A-Z]*$/.test(string);
const isLowerCaseLetter = (string: string) => /^[a-z]*$/.test(string);
const isNumber = (string: string) => /\d/.test(string);
const isSpecial = (string: string) => /[@$!%*?&]/.test(string);

export function validatePassword(password: string): PasswordErrors {
	let errors: PasswordErrors = {
		passwordUppercase: "Password needs at least 1 uppercase letter",
		passwordLowercase: "Password needs at least 1 lowercase letter",
		passwordNumber: "Password needs at least 1 number",
		passwordSpecial: "Password needs at least 1 special character",
		passwordLength: "",
	};

	// Passwords need to be bewteen 6 to 128 characters long
	// Passwords needs: 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character
	if (password.length < 6 || password.length > 128) {
		errors.passwordLength =
			"Password needs to be between 6 and 128 characters long";
	}

	// If passwords are valid, then all of the password errors will be cleared.
	for (let char of password) {
		if (isUpperCaseLetter(char)) {
			errors.passwordUppercase = "";
		}

		if (isLowerCaseLetter(char)) {
			errors.passwordLowercase = "";
		}

		if (isNumber(char)) {
			errors.passwordNumber = "";
		}

		if (isSpecial(char)) {
			errors.passwordSpecial = "";
		}
	}

	return errors;
}

export function validateChangePasswordForm(
	data: newPasswordForm
): newPasswordFormErrors {
	let errors = {
		currentPassword: "",
		newPassword: "",
		passwordSame: "",
		passwordUppercase: "",
		passwordLowercase: "",
		passwordSpecial: "",
		passwordLength: "",
		passwordNumber: "",
		retypeNewPassword: "",
	};

	errors = {
		...errors,
		...validatePassword(data.newPassword),
	};

	console.log(errors);

	if (data.currentPassword === data.newPassword) {
		errors.passwordSame =
			"Your new password cannot be the same as the old password";
	}

	if (data.retypeNewPassword !== data.newPassword) {
		errors.retypeNewPassword = "Your password does not match";
	}

	console.log(errors);
	return errors;
}

export function validateEmailForm(email: string): { email: string } {
	let errors = {
		email: "",
	};

	if (!emailRe.test(email)) {
		errors.email = "Please enter a valid email address";
	}

	return errors;
}
