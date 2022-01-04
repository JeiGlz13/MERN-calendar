import React from 'react';
import {mount} from 'enzyme';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import moment from 'moment';

import {CalendarModal} from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActive, eventStartAddNew } from '../../../redux/actions/eventsActions';
import Swal from 'sweetalert2';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('../../../redux/actions/eventsActions', () => ({
    eventSetAUpdate: jest.fn(),
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initState = {
    events: {
        events: [],
        activeEvent: {
            titulo: 'Hola mundo',
            descripcion: 'breve descripcion',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Jeisson'
    },
    modal: {
        modalOpen: true
    }
};

const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal/>
    </Provider>
);

describe('Pruebas en CalendarModal', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('Debe mostrar el modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true)     
    });
    
    test('Debe llamar la accion actualizar y cerrar el modal', () => {
        wrapper.find('button').at(0).simulate('click', {
            preventDefault(){}
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActiveEvent).toHaveBeenCalled();
    });

    test('Debe rellenar todos los campos', () => {
        wrapper.find('button').at(0).simulate('click', {
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "Rellene todos los campos", "error");
    });
    
    test('debe crear un nuevo evento', () => {
        const initState = {
            events: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123',
                name: 'Jeisson'
            },
            modal: {
                modalOpen: true
            }
        };
        
        const store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal/>
            </Provider>
        ); 

        wrapper.find('input[name="titulo"]').simulate("change",{
            target: {
                name: "titulo",
                value: "Hola prueba"
            }
        });

        wrapper.find('input[name="descripcion"]').simulate("change",{
            target: {
                name: "descripcion",
                value: "Descripcion prueba"
            }
        });

        wrapper.find('button').at(0).simulate('click', {
            preventDefault(){}
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            titulo: 'Hola prueba',
            descripcion: 'Descripcion prueba',
            start: expect.anything(),
            end: expect.anything(),

        });

        expect(eventClearActive).toHaveBeenCalled();
    });

    test('Debe validar las fechas', () => {
        wrapper.find('input[name="titulo"]').simulate("change",{
            target: {
                name: "titulo",
                value: "Hola prueba"
            }
        });

        wrapper.find('input[name="descripcion"]').simulate("change",{
            target: {
                name: "descripcion",
                value: "Descripcion prueba"
            }
        });

        const hoy = new Date;

        act(()=>{
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });

        wrapper.find('button').at(0).simulate('click', {
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha de fin debe ser luego de la de inicio", "error");
        
    });
    
    
});
