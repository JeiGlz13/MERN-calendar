import { closeModal, openModal } from "../../../redux/actions/modalActions";
import { modalReducer } from "../../../redux/reducers/modalReducer";

const initState = {
    modalOpen: false
}

describe('Pruebas en modal reducer', () => {
    test('Debe retornar el estado inicial', () => {
        const state = modalReducer(initState, {});
        expect(state).toEqual(initState);
    });
    
    test('Debe abrir y cerrar el modal', () => {
       const modalOpen =  openModal();
       const state = modalReducer(initState, modalOpen);

       expect(state).toEqual({modalOpen: true});

       const modalClose = closeModal();
       const stateClose = modalReducer(initState, modalClose);

       expect(stateClose).toEqual({modalOpen: false});
    });
});
