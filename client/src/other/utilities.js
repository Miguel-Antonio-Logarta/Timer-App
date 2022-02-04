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