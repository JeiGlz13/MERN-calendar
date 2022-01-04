import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";
import { types } from "../types/types";
import { eventClearActive, eventClearEvents } from "./eventsActions";

export const startLogin = (email, password) =>{
    return async (dispatch) =>{
        const resp = await fetchWithoutToken('auth', {email, password}, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            Swal.fire('Error', body.msg ,'error');
        }
    }
}

export const startRegister = (name, email, password) =>{
        return async (dispatch) =>{
            const resp = await fetchWithoutToken('auth/new', {name, email, password}, 'POST');
            const body = await resp.json();
            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
    
                dispatch(login({
                    uid: body.uid,
                    name: body.name
                }))
            }else{
                Swal.fire('Error', body.msg ,'error');
            }
        }
}

export const startChecking = () =>{
    return async (dispatch) =>{
        const resp = await fetchWithToken('auth/renew');
            const body = await resp.json();
            Swal.fire({
                title: 'Iniciando Sesion',
                text: 'Please Wait',
                allowOutsideClick: false,
                didOpen: ()=>{
                    Swal.showLoading();
                }
            });
            if (body.ok) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
    
                dispatch(login({
                    uid: body.uid,
                    name: body.name
                }))
            }else{
                dispatch(checkingFinish());
            }
            Swal.close();
    }
}

const checkingFinish = () =>({type: types.authCheckingFinish})

export const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () =>{
    return  (dispatch) =>{
        localStorage.clear();
        dispatch(logout());
        dispatch(eventClearEvents());
        dispatch(eventClearActive());
    }
}

export const logout = () =>({
    type: types.authLogout
})