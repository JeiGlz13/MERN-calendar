import { types } from "../../redux/types/types";


const testTypes = {
    setLoginForm: "[LOGIN] set login form",
    setRegisterForm: "[LOGIN] set register form",

    uiOpenModal: "[UI] open modal",
    uiCloseModal: "[UI] close modal",

    eventStartAddNew: "[EVENT] start add new",
    eventAddNew: "[EVENT]  add new",
    eventSetActive: "[EVENT] set active",
    eventClearActiveEvent: "[EVENT] clear active",
    eventUpdate: "[EVENT] update",
    eventDeleted: "[EVENT] deleted",
    eventSetStartEnd: "[EVENT] set start-end",
    eventClearStartEnd: "[EVENT] clear start-end",
    eventLoaded: "[EVENT] events loaded",
    eventClear: "[EVENT] events clear",

    authCheckingFinish: "[AUTH] finish checking login state",
    authStartLogin: "[AUTH] start login",
    authLogin: "[AUTH] login",
    authStartRegister: "[AUTH] start register",
    authStartTokenRenew: "[AUTH] start token renew",
    authLogout: "[AUTH] Logout"
}

describe('Pruebas en types', ()=>{
    test('Types deben ser iguales', () => {
        expect(types).toEqual(testTypes);
    })
    
})