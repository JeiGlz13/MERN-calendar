import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoginForm } from '../../../redux/actions/uiActions';

export const RegisterForm = () => {
    const dispatch = useDispatch();

    const handleSetLogin = (e) =>{
        e.preventDefault();
        dispatch(setLoginForm());
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
                            <input type="text" name="nombre" id="nombre" placeholder="Nombre" className="block w-full p-4 text-lg rounded-2xl bg-black"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-2xl bg-black"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input className="block w-full p-4 text-lg rounded-2xl bg-black" type="password" name="password" id="password" placeholder="Contraseña"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input className="block w-full p-4 text-lg rounded-2xl bg-black" type="password2" name="password2" id="password2" placeholder="Repita su contraseña"/>
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
                            <button className="uppercase block w-10/12 p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}
