import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../redux/actions/authActions';

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
          
              {/*<ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li><a className="hover:text-gray-200" href="#">Home</a></li>
                <li><a className="hover:text-gray-200" href="#">Catagory</a></li>
                <li><a className="hover:text-gray-200" href="#">Collections</a></li>
                <li><a className="hover:text-gray-200" href="#">Contact Us</a></li>
              </ul>*/}

              <div className="flex items-center space-x-5">
                <button onClick={handleLogout} 
                className="px-5 py-2 rounded-xl text-base sm:text-lg md:text-xl font-medium text-white bg-indigo-500 hover:bg-indigo-600 active:bg-grey-900 focus:outline-none transition-all
                flex items-center">
                    <i className="fas fa-door-open mr-2 text-base sm:text-lg md:text-xl"></i>
                    Salir
                </button>
              </div>
            </div>
         
           
            {/*<h3 className="navbar-burger self-center mr-12 sm:hidden" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </h3>*/}
          </nav>
          
        </section>
      </div>
       </>
    )
}
