import { types } from "../types/types";

const initialState = {
    login: true,
    register: false
}

export const uiReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.setLoginForm:
            return {
                ...state,
                login: true,
                register: false
            }
        case types.setRegisterForm:
            return {
                ...state,
                login: false,
                register: true
            }
    
        default:
            return state;
    }
}