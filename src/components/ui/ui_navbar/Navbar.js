import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../redux/actions/authActions';

import {Offline, Online} from 'react-detect-offline';

export const Navbar = () => {
    const {name} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = (e) =>{
      e.preventDefault();
      dispatch(startLogout());
    }

    return (
       <>
    <div className="flex flex-wrap box-border">
        <section className="relative mb-4 w-full">
           
          <nav className="flex justify-between bg-zinc-800 text-white w-full">
            <div className="px-5 xl:px-12 py-3 flex w-full items-center justify-between">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading" >
                Hola, {name}
              </h3>
          
              <Online>
                  <span className='text-lg font-Poppins font-bold text-green-400' >
                    Online
                  </span>
              </Online>

              <Offline>
                  <span className='text-lg font-Poppins font-bold text-red-500' >
                    Offline - conectese a internet
                  </span>
              </Offline>

              <div className="flex items-center space-x-5">
                <button onClick={handleLogout} 
                className="px-5 py-2 rounded-xl text-base sm:text-lg md:text-xl font-medium text-white bg-indigo-500 hover:bg-indigo-600 active:bg-grey-900 focus:outline-none transition-all
                flex items-center">
                    <i className="fas fa-door-open mr-2 text-base sm:text-lg md:text-xl"></i>
                    Salir
                </button>
              </div>
            </div>
        
          </nav>
          
        </section>
      </div>
       </>
    )
}
