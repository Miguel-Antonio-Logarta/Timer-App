import { createStore, applyMiddleware, compose } from 'redux';
import reducers from "./reducers/ReducerIndex";
import thunk from "redux-thunk";

// https://stackoverflow.com/questions/58790029/createstore-with-combinereducers-and-applymiddleware-without-second-argument
// preloadedState (any): The initial state. You may optionally specify it to hydrate the state from the server in 
// universal apps, or to restore a previously serialized user session. 
// If you produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it. 
// Otherwise, you are free to pass anything that your reducer can understand.
// The second argument is the preloaded state. It is optional/


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const Store = createStore(
    reducers, 
    {},
    composeEnhancers(applyMiddleware(thunk))
    );