import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { AppRouter } from '../../router/AppRouter';


const middleware = [thunk];
const mockStore = configureStore(middleware);


describe('Pruebas en el AppRouter', () => {
    test('Debe mostrarse correctamente', () => {
        const initState = {
            auth: {
                checking: true
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });
    
    test('Debe mostrar la ruta publica', () => {
        const initState = {
            auth: {
                checking: false,
                uid: null
            },
            ui: {
                register: true
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );

        expect(wrapper.find('.overflow-hidden').exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe mostrar la ruta publica', () => {
        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'Jeisson'
            },
            ui: {
                register: true
            },
            events: {
                events: []
            },
            modal: {
                modalOpen: false
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
