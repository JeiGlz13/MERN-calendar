import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import {messages} from '../../../helpers/calendarMessagesEs';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { types } from '../../../redux/types/types';
import { eventSetActive } from '../../../redux/actions/eventsActions';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('../../../redux/actions/eventsActions', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const initState = {
    events: {
        events: []
    },
    auth: {
        uid: '123',
        name: 'Jeisson'
    },
    modal: {
        modalOpen: false
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen/>
    </Provider>
);

describe('Pruebas en el calendar screen', () => {
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('Pruebas con las interacciones del calendario', () => {
        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: types.uiOpenModal
        });

        calendar.prop('onSelectEvent')({
            start: 'Hola'
        });

        expect(eventSetActive).toHaveBeenCalledWith({
            start: 'Hola'
        });

        act(()=>{
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
        });

    });
    
});
