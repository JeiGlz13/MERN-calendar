import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../../redux/actions/authActions';
import { types } from '../../../redux/types/types';
import * as fetchModule from '../../../helpers/fetch';
import Swal from 'sweetalert2';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

jest.mock('sweetalert2', ()=>({
    fire: jest.fn(),
    close: jest.fn()
}));

describe('Pruebas en authActions', () => {
    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    })
    
    test('startLogin correcto', async () => {
        await store.dispatch(startLogin('jeiglz13@gmail.com', '123456'));

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        //token = localStorage.setItem.mock.calls([0][1]);
    });

    test('login incorrecto', async () => {
        await store.dispatch(startLogin('jeiglz13@gmail.com', '123456789'));

        const actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalled();
    });
    
    test('Registro correcto', async () => {
        fetchModule.fetchWithoutToken = jest.fn(()=>({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Jose',
                    token: 'ABC123ABC123'
                }
            }
        }));


        /*await store.dispatch(startRegister('Jose' ,'test@test.com', '123456'));

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Jose'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));*/
    
    });

    test('pruebas en StartChecking', async () => {
        fetchModule.fetchWithToken = jest.fn(()=>({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Jose',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Jose',
            }
        });

        expect(localStorage.setItem).toHaveBeenCalled();
    });
    
});
