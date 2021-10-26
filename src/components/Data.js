const config = {
    timers: {
        "pomodoro": 1500,
        "long_break": 900,
        "short_break": 300,
    },
    styling: {
        background_url: "#",
        bacground_blur: 0,
        background_gaussian_blur: 0,
        background_brightness: 100,
    },
    todo_items: [
        {
            id: 1,
            title: "Spaghetti and meatballs bruh",
            description: "Da bih is making spaghetti",
            completed: false,
            time_left: 3600,
        },
        {
            id: 2,
            title: "Listen to some music today",
            description: "Listening to music makes it easier for you to concentrate",
            completed: false,
            time_left: 300,
        }
    ]
}

export default config;