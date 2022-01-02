import { types } from "../types/types";

/*
    {
        id: new  Date().getTime(),
        titulo: 'Cumpleaños',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        descripcion: 'Comprar pastel',
        user: {
            id: '123',
            name: 'Jeisson'
        }
    }
*/

const initialState = {
    events: [],
    activeEvent: null,
    setStart: null,
    setEnd: null
}

export const eventsReducer = (state = initialState, action) =>{
   switch (action.type) {
       case types.eventAddNew:
           return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
           }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                event => (event.id === action.payload.id) ? action.payload : event)
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                event => (event.id !== state.activeEvent.id)),
                activeEvent: null
            }

        case types.eventSetStartEnd:
            return {
                ...state,
                setStart: action.payload.eventStart,
                setEnd: action.payload.eventEnd
            }

        case types.eventClearStartEnd:
            return {
                ...state,
                setStart: null,
                setEnd: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
   
        case types.eventClear:
            return {
                ...initialState
            }

       default:
           return state;
   }
}