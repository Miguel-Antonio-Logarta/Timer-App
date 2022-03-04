import { camelCase, snakeCase } from 'lodash';
import Cookies from "universal-cookie"
import jwt_decode from "jwt-decode"


export function convertToHMS(milliseconds) { 
    const hrs = Math.floor(milliseconds/3600000);                       // 3600000ms in an hour
    const mins = Math.floor((milliseconds/60000)-(hrs*60));             // 60000ms in a minute. Get remaining minutes
    const secs = Math.floor((milliseconds/1000)-(hrs*3600)-(mins*60));  // 1000ms in a second. Get remaining seconds
    return { hrs, mins, secs };
}

export function convertToMilliseconds({hrs, mins, secs}) {
    return (hrs*3600000 + mins*60000 + secs*1000);
}

// This function is untested. Check for edge cases.
export function convertToHMSString(milliseconds) {
    let { hrs, mins, secs } = convertToHMS(milliseconds);
    hrs = hrs > 0 ? `${hrs}:` : ""; 
    mins = mins >= 10 ? `${mins}:` : `0${mins}:`;
    secs = secs >= 10 ? `${secs}` : `0${secs}`;
    return hrs + mins + secs;
}

// Recursively convert object keys into cameCase
// Solution found from: https://stackoverflow.com/a/50620653
export const camelCaseKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => camelCaseKeys(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: camelCaseKeys(obj[key]),
        }),
        {},
      );
    }
    return obj;
};

// Recursively convert objets keys into snake_case
export const snakeCaseKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(v => snakeCaseKeys(v));
    } else if (obj != null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [snakeCase(key)]: snakeCaseKeys(obj[key]),
        }),
        {},
      );
    }
    return obj;
};

// Adds access token authorization in the header for fetch requests
export const authHeader = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    if (user && user.accessToken) {
        return {
            Authorization: "Bearer " + user.accessToken,
        }
    } else {
        return {};
    }
}

// Decodes the JWT access token
export const getCurrentUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    if (!user || !user.accessToken) {
        return false;
    }
    return jwt_decode(user.accessToken);
}
