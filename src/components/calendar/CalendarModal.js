import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/actions/modalActions'
import {eventAddNew, eventClearActive, eventClearStartEnd, eventUpdate} from '../../redux/actions/eventsActions';


Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");


export const CalendarModal = () => {
	const {modalOpen} = useSelector(state => state.modal);
	const {activeEvent, setStart, setEnd} = useSelector(state => state.events);

	let initEvent = {
		titulo: '',
		descripcion: '',
		start: now.toDate(),
		end: nowPlus1.toDate()
	}

	const dispatch = useDispatch();

	const [dateStart, setDateStart] = useState(now.toDate());
	const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());

	const [formValues, setFormValues] = useState(initEvent);

	const {titulo, descripcion, start, end} = formValues;

	useEffect(() => {
		if(setStart && setEnd){
			initEvent = {
				...initEvent,
				start: setStart,
				end: setEnd
			}
			setDateStart(setStart);
			setDateEnd(setEnd);
		}else{
			const firstDate = now.toDate();
			const secondDate = nowPlus1.toDate();
			initEvent = {
				...initEvent,
				start: firstDate,
				end: secondDate
			}
				setDateStart(firstDate);
				setDateEnd(secondDate);
		}
	}, [setStart, setEnd])

	useEffect(() => {
		if (activeEvent) {
			setFormValues(activeEvent);
		}else{
			setFormValues(initEvent);
		}
		
	}, [activeEvent, setFormValues])


	const handleInputChange = ({target}) =>{
		setFormValues({
			...formValues,
			[target.name]: target.value
		})
	}

	
	const handleStartDate = (e) =>{
		setDateStart(e);
		setFormValues({
			...formValues,
			start: e
		});
	}

	const handleEndDate = (e) =>{
		setDateEnd(e);
		setFormValues({
			...formValues,
			end: e
		});
	}

	const validateForm = () =>{
		const firstDate = moment(start);
		const secondDate = moment(end);
		if(firstDate.isSameOrAfter(secondDate)){
			Swal.fire("Error", "La fecha de fin debe ser luego de la de inicio", "error");
			return false}
		if((titulo.trim().length < 2)||(descripcion.trim().length < 2)){
			Swal.fire("Error", "Rellene todos los campos", "error");
			return false}
		Swal.fire("Success", "Nueva nota añadida con éxito", "success");
		return true;
		
	}

	const saveNewEvent = (event) =>{
		dispatch( eventAddNew({
			...event,
			user: {
				id: new Date().getTime(),
				name: 'Jeisson'
			}
		}) );
	}

	const updateEvent = (evemt) =>{
		dispatch(eventUpdate(evemt));
	}

	const handleSubmitForm = (e) =>{
		e.preventDefault();
		if(validateForm() === true){
			//TODO: send to database

			if(activeEvent){
				updateEvent(formValues);
			}else{
				saveNewEvent(formValues);
			}
			setCloseModal();
		}
	}


	const setCloseModal = () =>{
       dispatch(closeModal());
	   setFormValues(initEvent);
	   dispatch(eventClearActive());
	   dispatch(eventClearStartEnd())
    }

    return (
        <Modal
        isOpen={modalOpen}
       // onAfterOpen={afterOpenModal}
        onRequestClose={setCloseModal}
        closeTimeoutMS={200}
        className="py-6 flex flex-col justify-center sm:py-12 outline-none focus:outline-none border-0"
        overlayClassName="modal-fondo"
      >
        
       
	<div className ="relative py-3 sm:max-w-xl sm:mx-auto font-Poppins">
		<div
			className ="absolute inset-0 bg-gradient-to-r from-indigo-300 to-indigo-600 shadow-lg transform -skew-y-3 sm:skew-y-0 -rotate-3 sm:-rotate-6 rounded-2xl sm:rounded-3xl">
		</div>
		<div className ="relative px-8 py-4 bg-white shadow-lg rounded-2xl sm:rounded-3xl sm:px-14 sm:py-8">
			<div className ="max-w-md mx-auto outline-none focus:outline-none border-0">
				<div>
					<h1 className ="text-lg sm:text-2xl font-semibold text-indigo-700 px-12 sm:px-24">
						{
							(activeEvent) ? ("Editar evento") : ("Nuevo Evento")
						}
					</h1>
				</div>
				<div className ="divide-y divide-gray-200">
					<div className ="py-4 sm:py-8 text-sm leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-col justify-center">

                        <div className ="relative">
							<input autocomplete="off" id="titulo" name="titulo" type="text"
							value={titulo} onChange={handleInputChange}
							className ="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Titulo" />
							<label for="titulo" className ="absolute left-0 -top-3.5 text-gray-800 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-indigo-600 peer-focus:text-sm">Titulo</label>
						</div>

						<div className ="relative">
							<label className ="absolute left-0 -top-3.5 text-gray-800 text-base">Fecha y hora inicio</label>

							<DateTimePicker
								onChange={handleStartDate}
								value={dateStart}
								className="mt-4"
							/>
						</div>

						<div className ="relative">
							<label className ="absolute left-0 -top-3.5 text-gray-800 text-base">Fecha y hora final</label>

							<DateTimePicker
								onChange={handleEndDate}
								value={dateEnd}
								minDate={dateStart}
								className="mt-4"
							/>
						</div>

                        <div className ="relative">
                            <textarea id="descripcion" name="descripcion" rows="5" 
							value={descripcion} onChange={handleInputChange}
							className ="resize-none peer placeholder-transparent w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" type = "text" placeholder="Descripcion">
                            </textarea>
							<label for="descripcion" className ="absolute left-0 -top-3.5 text-gray-800 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-indigo-600 peer-focus:text-sm">Descripcion</label>
						</div>
					
						<div className ="relative">
							<button className ="bg-indigo-500 text-white rounded-xl px-4 py-2"
							onClick={handleSubmitForm} >Guardar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
      </Modal>
    )
}
