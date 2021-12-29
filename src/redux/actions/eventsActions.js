import { types } from "../types/types";

export const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) =>({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () =>({
    type: types.eventClearActiveEvent
});

export const eventUpdate= (event) =>({
    type: types.eventUpdate,
    payload: event
})

export const eventDeleted = () =>({type: types.eventDeleted});

export const eventSetStartEnd = (start, end) =>({
    type: types.eventSetStartEnd,
    payload: {
        eventStart: start,
        eventEnd: end
    }
});

export const eventClearStartEnd = () => ({type: types.eventClearStartEnd});