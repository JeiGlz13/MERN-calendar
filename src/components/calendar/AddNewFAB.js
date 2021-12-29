import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/actions/modalActions';

export const AddNewFAB = () => {
    const dispatch = useDispatch();

    const setOpenModal = () =>{
        dispatch(openModal());
    }
    return (
        <button
        className= "absolute z-50 bottom-4 right-4 bg-indigo-500 text-white text-xl sm:text-2xl md:text-3xl h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16  rounded-full m-2"
        onClick={setOpenModal} >
            <i className='fas fa-plus'></i>
        </button>
    )
}
