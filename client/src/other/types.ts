export enum intervalNames {
    POMODORO = "Pomodoro",
    SHORTBREAK = "Short Break",
    LONGBREAK = "Long Break"
}

export interface TodoItem {
  id: number;
  ownerId: number;
  title: string;
  description: string | null;
  timeSet: number | null;
  timeLeft: number | null;
  dueDate: string | null;    // This should be a date, but redux wants the todoItem to be serializable
  createdOn: string;        // This should be a date, but redux wants the todoItem to be serializable
  completed: boolean;
}

export interface HMSTime {
  hrs: number;
  mins: number;
  secs: number;
}

export interface TodoItemForm {
  title: string;
  description: string;
  dueDate: string;
  hrs: number,
  mins: number,
  secs: number,
}

export interface CreateTodoItem {
  title: string;
  description: string | null;
  dueDate: string | null;
  timeLeft: number | null;
}

export interface UpdateTodoItem extends CreateTodoItem{
  id: number;
  ownerId: number;
  createdOn: string;        // This should be a date, but redux wants the todoItem to be serializable
  completed: boolean;
}

export interface CompleteTodoItem {
  id: number,
  completed: boolean;
}

export interface TodoItemFormErrors {
  title: string;
  description: string;
  time: string;
  dueDate: string;
}

export interface loginRequest {
  username: string;
  password: string;
}

export interface SignUpFormData {
	username: string;
	email: string;
	password: string;
	retypePassword: string;
}

export interface SignUpFormErrors {
	username: string;
	email: string;
  passwordUppercase: string;
  passwordLowercase: string;
  passwordNumber: string;
  passwordSpecial: string;
  passwordLength: string;
	retypePassword: string;
}

export interface PasswordErrors {
  passwordUppercase: string;
  passwordLowercase: string;
  passwordSpecial: string;
  passwordLength: string;
  passwordNumber: string;
}

export interface newPasswordForm {
  currentPassword: string;
  newPassword: string;
  retypeNewPassword: string; 
}

export interface newPasswordFormErrors extends PasswordErrors {
  currentPassword: string;
  passwordSame: string;
  newPassword: string;
  retypeNewPassword: string; 
}