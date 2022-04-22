import { Middleware } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";
import Cookies from "universal-cookie";

// export const checkTokenExpirationMiddleware = store => next => action => {
//   const token =
//     JSON.parse(localStorage.getItem("user")) &&
//     JSON.parse(localStorage.getItem("user"))["token"];
//   if (jwtDecode(token).exp < Date.now() / 1000) {
//     next(action);
//     localStorage.clear();
//   }
//   next(action);
// };

export const checkTokenExpirationMiddleware: Middleware = api => next => action => {
  const cookies = new Cookies();
  const user = cookies.get('user')
  if (user && user.accessToken) {
    interface Token {
			userId: number;
			username: string;
			exp: number;
			iat: number;
		}
    const token = jwtDecode<Token>(user.accessToken);
    if (token.exp < Date.now() / 1000) {
      alert("Token has expired!");
      // Removes token when expired.
      next(action);
      cookies.remove('user', { path: "/" });
    }
  }

  next(action);
  // const token =
  //   JSON.parse(localStorage.getItem("user")) &&
  //   JSON.parse(localStorage.getItem("user"))["token"];
  // if (jwtDecode(token).exp < Date.now() / 1000) {
  //   next(action);
  //   localStorage.clear();
  // }
  // next(action);
  // // Do stuff
  // return next(action);
};