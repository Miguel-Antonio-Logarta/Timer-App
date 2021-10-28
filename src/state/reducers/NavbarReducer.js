const initialState = {
    showHome: true,
    showTodos: false,
    showSettings: false,
    showUser: false,
}

const NavbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_COMPONENT':
            if (state["show" + action.payload] !== undefined) {                         // Check if the name is valid 
                Object.keys(state).forEach(v => state[v] = false);                      // Make all shows false
                state["show" + action.payload] = true;                                  // action.payload is the name of the component
                console.log(state);
                return {...state};
            }
            console.log("This component does not exist: show" + action.payload);
            return state;
        default:
            return state;
    }
}

export default NavbarReducer;