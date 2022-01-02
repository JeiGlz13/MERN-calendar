import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useForm } from '../../../customHooks/useForm';
import { startRegister } from '../../../redux/actions/authActions';
import { setLoginForm } from '../../../redux/actions/uiActions';

export const RegisterForm = () => {
    const dispatch = useDispatch();

    const handleSetLogin = (e) =>{
        e.preventDefault();
        dispatch(setLoginForm());
    }

    const initialRegister = {
        nombre: '',
        email: '',
        password1: '',
        password2: ''
    }
    const [formValues, handleInputChange,reset] = useForm(initialRegister);

    const {nombre, email, password1, password2} = formValues;

    const handleRegister = (e) =>{
        e.preventDefault();
        if (password1 !== password2){Swal.fire('Error', 'Las contraseñas no coinciden', 'error')}
        dispatch(startRegister(nombre, email, password1));
        reset();
    }

    return (
        <div className="animate__animated animate__fadeInLeft animate__faster lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-zinc-800" >
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <h1 className="my-6 text-4xl sm:text-5xl text-white font-Newake">
                        MERN Calendar
                    </h1>
           
                    <form action="" className="sm:w-9/12 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input type="text" 
                            name="nombre" id="nombre" 
                            value={nombre} onChange={handleInputChange}
                            placeholder="Nombre" 
                            className="block w-full p-4 text-lg rounded-2xl bg-black"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input type="email" 
                            name="email" id="email"
                            value={email} onChange={handleInputChange} 
                            placeholder="Email" 
                            className="block w-full p-4 text-lg rounded-2xl bg-black"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input className="block w-full p-4 text-lg rounded-2xl bg-black" 
                            type="password" name="password1" id="password1"
                            value={password1} onChange={handleInputChange} 
                            placeholder="Contraseña"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input className="block w-full p-4 text-lg rounded-2xl bg-black" 
                            type="password" 
                            name="password2" id="password2"
                            value={password2} onChange={handleInputChange} 
                            placeholder="Repita su contraseña"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <h1 className= "text-gray-400 text-sm" >
                                ¿Ya tiene una cuenta?
                                <button className= "text-gray-200 text-sm cursor-pointer ml-1"
                                onClick={handleSetLogin} >
                                    Inicie Sesión
                                </button> 
                            </h1>
                        </div>
            
                        <div className="px-4 pb-2 pt-4 flex justify-center">
                            <button
                            onClick={handleRegister} 
                            className="uppercase block w-10/12 p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
}
