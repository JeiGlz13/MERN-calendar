import Swal from "sweetalert2";
import { fetchWithToken } from "../../helpers/fetch";
import { getEventsByUser } from "../../helpers/getEventsByUser";
import { prepareEvents } from "../../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) =>{
    return async (dispatch, getState) =>{
        const {uid, name} = getState().auth;

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();

            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) =>({
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

export const eventStartUpdate = (event) =>{
    return async (dispatch) =>{
        try {
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventUpdate(event));
            }else{
                Swal.fire('Error', body.msg ,'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
} 

const eventUpdate= (event) =>({
    type: types.eventUpdate,
    payload: event
})

export const eventStartDelete = () =>{
    return async (dispatch, getState) =>{
        const {id} = getState().events.activeEvent;
        try {
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(eventDeleted());
                Swal.fire('Success', 'Evento eliminado con exito', 'success');
            }else{
                Swal.fire('Error', body.msg ,'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
} 

const eventDeleted = () =>({type: types.eventDeleted});

export const eventSetStartEnd = (start, end) =>({
    type: types.eventSetStartEnd,
    payload: {
        eventStart: start,
        eventEnd: end
    }
});

export const eventClearEvents = () =>({type: types.eventClear});

export const eventClearStartEnd = () => ({type: types.eventClearStartEnd});

export const eventStartLoading = () =>{
    return async (dispatch, getState) =>{
        try {
                const {uid} = getState().auth;
               const resp = await fetchWithToken('events/');
               const body = await resp.json();

               const myEvents = getEventsByUser(body.eventos, uid);

               const eventos = prepareEvents(myEvents);


               dispatch(eventLoaded(eventos));


        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (eventos) =>({
    type: types.eventLoaded,
    payload: eventos

})