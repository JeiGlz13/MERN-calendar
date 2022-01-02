import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../../customHooks/useForm';
import { startLogin } from '../../../redux/actions/authActions';
import { setRegisterForm } from '../../../redux/actions/uiActions';

export const LoginForm = () => {
    const dispatch = useDispatch();

    const handleSetRegister = (e) =>{
        e.preventDefault();
        dispatch(setRegisterForm());
    }

    const initialLogin = {
        email: '',
        password: ''
    }
    const [formValues, handleInputChange,reset] = useForm(initialLogin);

    const {email, password} = formValues;

    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(startLogin(email, password));
        reset();
    }

    return (
        <div className="animate__animated animate__fadeInRight animate__faster lg:w-1/2 w-full h-screen flex items-center justify-center text-center md:px-16 px-0 z-0 bg-zinc-800" >
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500  bg-no-repeat bg-cover items-center" >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <h1 className="my-6 text-4xl sm:text-5xl text-white font-Newake">
                        MERN Calendar
                    </h1>
           
                    <div className="sm:w-9/12 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input type="email" name="email" id="email"
                            value={email} onChange={handleInputChange} 
                            placeholder="Email" 
                            className="block w-full p-4 text-lg rounded-2xl bg-black"/>
                        </div>
                        <div className="pb-2 pt-4">
                            <input className="block w-full p-4 text-lg rounded-2xl bg-black" 
                            type="password" name="password" id="password" 
                            value={password} onChange={handleInputChange}
                            placeholder="Password"/>
                        </div>

                        <div className="pb-2 pt-4">
                            <h1 className= "text-gray-400 text-sm" >
                                ¿No tiene una cuenta?
                                <button className= "text-gray-200 text-sm cursor-pointer ml-1"
                                onClick={handleSetRegister} >
                                    Registrese
                                </button>  
                            </h1>
                        </div>
            
                        <div className="px-4 pb-2 pt-4 w-full flex justify-center">
                            <button 
                            onClick={handleLogin}
                            className="uppercase block w-10/12 p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                                Iniciar Sesión
                            </button>
                        </div>

                      
                    </div>
                </div>
            </div>
    )
}
