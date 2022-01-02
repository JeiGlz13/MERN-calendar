import moment from "moment";

export const prepareEvents = (eventos = []) =>{
    return eventos.map(e=>({
        ...e,
        start: moment(e.start).toDate(),
        end: moment(e.end).toDate()
    }));
}