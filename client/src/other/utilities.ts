import { camelCase, snakeCase } from "lodash";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import {
	HMSTime,
	SignUpFormData,
	SignUpFormErrors,
	TodoItem,
	TodoItemForm,
	TodoItemFormErrors,
} from "./types";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

export function convertToHMS(milliseconds: number): HMSTime {
	const hrs = Math.floor(milliseconds / 3600000); // 3600000ms in an hour
	const mins = Math.floor(milliseconds / 60000 - hrs * 60); // 60000ms in a minute. Get remaining minutes
	const secs = Math.floor(milliseconds / 1000 - hrs * 3600 - mins * 60); // 1000ms in a second. Get remaining seconds
	return { hrs, mins, secs };
}

export function convertToMilliseconds(time: HMSTime): number {
	return time.hrs * 3600000 + time.mins * 60000 + time.secs * 1000;
}

// This function is untested. Check for edge cases.
export function convertToHMSString(milliseconds: number): string {
	let { hrs, mins, secs } = convertToHMS(milliseconds);
	let hrsString: string = hrs > 0 ? `${hrs}:` : "";
	let minsString: string = mins >= 10 ? `${mins}:` : `0${mins}:`;
	let secsString: string = secs >= 10 ? `${secs}` : `0${secs}`;
	return `${hrsString}${minsString}${secsString}`;
}

// Recursively convert object keys into cameCase
// Solution found from: https://stackoverflow.com/a/50620653
export const camelCaseKeys: any = (obj: any) => {
	if (Array.isArray(obj)) {
		return obj.map((v) => camelCaseKeys(v));
	} else if (obj != null && obj.constructor === Object) {
		return Object.keys(obj).reduce(
			(result, key) => ({
				...result,
				[camelCase(key)]: camelCaseKeys(obj[key]),
			}),
			{}
		);
	}
	return obj;
};

// Recursively convert objets keys into snake_case
export const snakeCaseKeys: any = (obj: any) => {
	if (Array.isArray(obj)) {
		return obj.map((v) => snakeCaseKeys(v));
	} else if (obj != null && obj.constructor === Object) {
		return Object.keys(obj).reduce(
			(result, key) => ({
				...result,
				[snakeCase(key)]: snakeCaseKeys(obj[key]),
			}),
			{}
		);
	}
	return obj;
};

// Adds access token authorization in the header for fetch requests
export const authHeader = () => {
	const cookies = new Cookies();
	const user = cookies.get("user");
	if (user && user.accessToken) {
		return {
			Authorization: "Bearer " + user.accessToken,
		};
	} else {
		return { Authorization: "" };
	}
};

// Decodes the JWT access token
export const getCurrentUser = () => {
	const cookies = new Cookies();
	const user = cookies.get("user");
	if (!user || !user.accessToken) {
		return false;
	}
	return camelCaseKeys(jwt_decode(user.accessToken));
};

export function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function createFakeTodoList(
	arrSize: number,
	ownerId: number
): Array<TodoItem> {
	let arr: Array<TodoItem> = [];
	for (let i = 0; i < arrSize; i++) {
		let randomNum = getRandomInt(0, 356400000);
		let timeSet = randomNum;
		let todoItem: TodoItem = {
			id: getRandomInt(1, 1000000),
			ownerId: ownerId,
			title: faker.lorem.sentence(),
			description: faker.lorem.sentences(),
			timeSet: timeSet,
			timeLeft: timeSet - getRandomInt(0, timeSet),
			dueDate: faker.date.future().toISOString().slice(0, 10),
			createdOn: faker.date.past().toISOString().slice(0, 10),
			completed: getRandomInt(0, 1) as unknown as boolean,
		};
		arr.push(todoItem);
	}
	return arr;
}

export function toReadableDate(date: string): string {
	const isValid = dayjs(date).isValid();
	return isValid ? dayjs(date).format("MMMM D, YYYY") : "";
}

// Needs to be tested.
export function validateTodo(data: TodoItemForm): TodoItemFormErrors {
	let errors: TodoItemFormErrors = {
		title: "",
		description: "",
		dueDate: "",
		time: "",
	};

	if (data.title == null || data.title.trim().length === 0) {
		errors.title = "Please enter a todo";
	} else if (data.title.trim().length > 150) {
		errors.title =
			"Character limit reached. Please limit your description to 150 characters";
	}

	// Check description character limit
	if (data.description != null && data.description.length > 1500) {
		errors.description =
			"Character limit reached. Please limit your description to 1500 characters";
	}

	// const onlyNums = /^[0-9]*$/; // Parse input including empty fields
	if (
		Number(data.hrs) < 0 ||
		Number(data.mins) < 0 ||
		Number(data.secs) < 0 ||
		Number(data.mins) > 59 ||
		Number(data.secs) > 59
	) {
		errors.time = "Please enter a valid time that is in range";
	}

	// Check date validity
	if (data.dueDate != null && data.dueDate.length !== 0) {
		if (!dayjs(data.dueDate, "YYYY-MM-DD", true).isValid()) {
			errors.dueDate = "Please enter a valid date";
		}
	}

	return errors;
}

// Needs to be tested.
export const validateSignUp = (data: SignUpFormData): SignUpFormErrors => {
	let errors: SignUpFormErrors = {
		username: "",
		email: "",
		// password errors will be cleared when we loop through the password string.
		passwordUppercase: "Password needs at least 1 uppercase letter",
		passwordLowercase: "Password needs at least 1 lowercase letter",
		passwordNumber: "Password needs at least 1 number",
		passwordSpecial: "Password needs at least 1 special character",
		passwordLength: "",
		retypePassword: "",
	};

	// usernames are alphanumeric, but can have hyphens (-) and underscores (_) in them
	// Usernames need to be between 6 to 30 characters long
	const usernameRe = /^[A-Za-z0-9_-]{5,29}$/;
	if (!usernameRe.test(data.username)) {
		errors.username = "Please enter a valid username";
	}

	const emailRe =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if (!emailRe.test(data.email)) {
		errors.email = "Please enter a valid email address";
	}

	// Passwords need to be bewteen 6 to 128 characters long
	// Passwords needs: 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character
	if (data.password.length < 6 || data.password.length > 128) {
		errors.passwordLength =
			"Password needs to be between 6 and 128 characters long";
	}

	const isUpperCaseLetter = (string: string) => /^[A-Z]*$/.test(string);
	const isLowerCaseLetter = (string: string) => /^[a-z]*$/.test(string);
	const isNumber = (string: string) => /\d/.test(string);
	const isSpecial = (string: string) => /[@$!%*?&]/.test(string);

	// If passwords are valid, then all of the password errors will be cleared.
	for (let char of data.password) {
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

	if (data.retypePassword !== data.password) {
		errors.retypePassword = "Your password does not match";
	}

	return errors;
};
