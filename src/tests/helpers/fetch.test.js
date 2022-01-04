import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe('Pruebas en el helper fetch', () => {
    let token = '';

    test('FetchWithoutToken debe funcionar', async () => {
        const resp = await fetchWithoutToken('auth', {
            email: 'jeiglz13@gmail.com',
            password: '123456'
        },
        'POST');

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);

        token = body.token;
    });   
    
    test('FetchWithToken debe funcionar', async () => {
        localStorage.setItem('token', token);

        const resp = await fetchWithToken('events/61cf647fdedb35dfd7685395', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Evento no existe');
    });   
})
