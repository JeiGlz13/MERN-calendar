import React from 'react';

export const CalendarEvent = ({event}) => {

    const {titulo, user} = event;
    return (
        <div className='flex flex-col focus:outline-none outline-none text-xs sm:text-sm md:text-base' >
            <span>{titulo}</span>
            <strong>- {user.name} </strong>
        </div>
    )
}
