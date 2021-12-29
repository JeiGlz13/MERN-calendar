import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { eventsReducer } from './reducers/eventsReducer';
import { modalReducer } from './reducers/modalReducer';
import { uiReducer } from './reducers/uiReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    ui: uiReducer,
    modal: modalReducer,
    events: eventsReducer,
});
export const store = createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware(thunk)
    ));