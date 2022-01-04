import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { DeleteEventFAB } from '../../../components/calendar/DeleteEventFAB';
import { eventStartDelete } from '../../../redux/actions/eventsActions';

jest.mock('../../../redux/actions/eventsActions', () => ({
    eventStartDelete: jest.fn()
}))

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFAB/>
    </Provider>
);

describe('Pruebas en DeleteEventFAB', () => {
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();

    });
    
    test('Debe llamar el eventStartDelete', () => {
       wrapper.find('button').prop('onClick')();
       
       expect(eventStartDelete).toHaveBeenCalled();
    });
    
})
