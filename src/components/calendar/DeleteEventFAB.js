import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../redux/actions/eventsActions';

export const DeleteEventFAB = () => {
    const dispatch = useDispatch();

    const handleDelete = () =>{
        dispatch(eventStartDelete());
    }
    return (
        <button
        className='absolute z-50 bottom-4 left-4 bg-red-500 text-white text-xl sm:text-2xl md:text-3xl h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full m-2'
        onClick={handleDelete} >
            <i className='fas fa-trash'></i>
        </button>
    )
}
