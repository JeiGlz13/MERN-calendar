import React from 'react';
import { useSelector } from 'react-redux';
import banner from "../../assets/agendaWallpaper.jpg";
import { LoginForm } from '../ui/ui_login/LoginForm';
import { RegisterForm } from '../ui/ui_login/RegisterForm';

export const LoginScreen = () => {
    const ui = useSelector(state => state.ui);

    return (
        <section className="w-full bg-gray-200 flex items-center justify-center text-white font-Poppins">
            <div className='w-11/12 my-8 flex flex-row border-8 border-white rounded-3xl z-50 overflow-hidden shadow-2xl'>
                {
                    (ui.register === true)&&(
                        <RegisterForm/>
                    )    
                }
                <div className="lg:flex w-1/2 hidden bg-gray-500 relative items-center animate__animated animate__fadeIn animate__faster" >
                    <img src={banner} alt='banner'
                    className = "relative opacity-90 z-0 overflow-hidden h-screen" />
                    <div class="absolute bg-black opacity-30 inset-0 z-10"></div>
                    
                    <div className="absolute w-full px-24 z-20">
                        <h1 className="text-5xl font-bold text-left tracking-wide">Agenda personal</h1>
                        <p className="text-3xl my-4">Anota tus recordatorios en esta agenda virtual</p>
                    </div>
                
                </div>
                {
                    (ui.login === true)&&(
                        <LoginForm/>
                    )    
                }
            </div>
        </section>
    )
}
