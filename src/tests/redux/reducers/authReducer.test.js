import { logout, login } from "../../../redux/actions/authActions";
import { authReducer } from "../../../redux/reducers/authReducer";
import { types } from "../../../redux/types/types";

const initState = {
    checking: true
}

describe('Pruebas en el authReducer', () => {
   test('Debe retornar el estado por defecto', () => {
       const state = authReducer(initState, {});

       expect(state).toEqual(initState);
   });

   test('Debe hacer el logout', () => {
       const authLogout = logout();
       const state = authReducer(initState, authLogout);

       expect(state).toEqual({
           checking: false
       })
   });

   test('Debe hacer el login', () => {
    const action = {
        type: types.authLogin,
        payload: {
            uid: '12345', 
            name: 'Jeisson'
        } 
    }

      const state = authReducer(initState, action);

      expect(state).toEqual({
        checking: false,
        uid: '12345', 
        name: 'Jeisson'
    } );
   });
   
   
});
