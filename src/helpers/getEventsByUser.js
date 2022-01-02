export const getEventsByUser = (eventos = [], uid) =>{
    return eventos.filter((event) => (event.user._id === uid) && event);
}