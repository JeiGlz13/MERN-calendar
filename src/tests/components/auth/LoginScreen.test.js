import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../redux/actions/authActions';
import Swal from 'sweetalert2';



jest.mock('../../../redux/actions/authActions', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middleware = [thunk];
const mockStore = configureStore(middleware);


describe('Pruebas en el Login Screen', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    })

   test('Debe mostrarse correctamente', () => {
        const initState = {
            ui: {
                register: true,
                login: false
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <LoginScreen/>
            </Provider>
        );

       expect(wrapper).toMatchSnapshot();
   })
    
   test('Debe llamar el dispatch del login', () => {
    const initState = {
        ui: {
            register: false,
            login: true
        }
    };
    
    const store = mockStore(initState);
    store.dispatch = jest.fn();
    
    const wrapper = mount(
        <Provider store={store}>
            <LoginScreen/>
        </Provider>
    );

    wrapper.find('input[name="email"]').simulate("change",{
        target: {
            name: "email",
            value: "jeiglz13@gmail.com"
        }
    });

    wrapper.find('input[name="password"]').simulate("change",{
        target: {
            name: "password",
            value: "123456"
        }
    });

    wrapper.find('button').at(1).prop('onClick')({
        preventDefault(){}
    });

    expect(startLogin).toHaveBeenCalledWith('jeiglz13@gmail.com', '123456');
   });

   test('No hay registro si las password son diferentes', () => {

        const initState = {
            ui: {
                register: true,
                login: false
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <LoginScreen/>
            </Provider>
        );

        wrapper.find('input[name="nombre"]').simulate("change",{
            target: {
                name: "nombre",
                value: "Jeisson"
            }
        });

        wrapper.find('input[name="email"]').simulate("change",{
            target: {
                name: "email",
                value: "jeiglz13@gmail.com"
            }
        });

        wrapper.find('input[name="password1"]').simulate("change",{
            target: {
                name: "password1",
                value: "123456"
            }
        });

        wrapper.find('input[name="password2"]').simulate("change",{
            target: {
                name: "password2",
                value: "1234567"
            }
        });

        wrapper.find('button').at(1).prop('onClick')({
            preventDefault(){}
        });

        expect(startRegister).toHaveBeenCalledTimes(0);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden', 'error');
       
   });
   
   test('Registro si las password son iguales', () => {

        const initState = {
            ui: {
                register: true,
                login: false
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <LoginScreen/>
            </Provider>
        );

        wrapper.find('input[name="nombre"]').simulate("change",{
            target: {
                name: "nombre",
                value: "Jeisson"
            }
        });

        wrapper.find('input[name="email"]').simulate("change",{
            target: {
                name: "email",
                value: "jeiglz13@gmail.com"
            }
        });

        wrapper.find('input[name="password1"]').simulate("change",{
            target: {
                name: "password1",
                value: "123456"
            }
        });

        wrapper.find('input[name="password2"]').simulate("change",{
            target: {
                name: "password2",
                value: "123456"
            }
        });

        wrapper.find('button').at(1).prop('onClick')({
            preventDefault(){}
        });

        expect(startRegister).toHaveBeenCalledWith('Jeisson', 'jeiglz13@gmail.com', '123456');
        expect(Swal.fire).not.toHaveBeenCalled();
    
    });
});
