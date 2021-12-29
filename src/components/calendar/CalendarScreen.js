import React, { useState } from 'react'
import { Navbar } from '../ui/ui_navbar/Navbar';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendarMessagesEs';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
import { eventClearActive, eventSetActive, eventSetStartEnd } from '../../redux/actions/eventsActions';
import { AddNewFAB } from './AddNewFAB';
import { DeleteEventFAB } from './DeleteEventFAB';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
    const {events, activeEvent} = useSelector(state => state.events);
    const dispatch = useDispatch();
    const initialState = localStorage.getItem('lastView') || 'month';
    const [lastView, setLastView] = useState(initialState);

    const onDoubleClick = (e) =>{
        dispatch(openModal());
    }

    const onSelectEvent = (e) =>{
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) =>{
        const style = {
            backgroundColor: 'rgb(99 102 241)',
            borderRadius: '0px',
            opacity: 0.9,
            display: 'block',
            color: 'white'
        }

        return{
            style
        }
    }

    const onSelectSlot = (e) =>{
        dispatch(eventSetStartEnd(e.start, e.end))
        dispatch(eventClearActive());
        dispatch(openModal());
    }

    return (
        <div className='flex flex-col h-screen font-Poppins' >
            <Navbar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable = {true}
                onView={onViewChange}
                view= {lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            {
                (activeEvent)&&(
                    <DeleteEventFAB/>
                )
            }
            
            <AddNewFAB/>

            <CalendarModal/>
        </div>
    )
}
