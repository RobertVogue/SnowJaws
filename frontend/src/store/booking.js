import fetch from './csrf';

const BOOKING = 'booking/BOOKING';
const ALLBOOKINGS = 'booking/ALLBOOKINGS';
const REMOVEBOOKING = 'booking/REMOVEBOOKING';

const booking = (booking) => ({
    type: BOOKING,
    booking
});
const allBookings = (bookings) => ({
    type: ALLBOOKINGS,
    bookings
});
const removeBooking = (bookingId) => ({
    type: REMOVEBOOKING,
    bookingId
});
export const getOneB = (id) => async dispatch => {
    const res = await fetch(`/api/bookings/${id}`, {
    });
    if (res.ok) {
        const retBook = res.data.booking;
        dispatch(booking(retBook));
    }
    return res;
}
export const getAllB = () => async dispatch => {
    const res = await fetch(`/api/bookings`, {
    });
    if (res.ok) {
        const retBook2 = res.data.bookings;
        dispatch(allBookings(retBook2));
    }
    return res;
}
export const createOneB = ({ booking }) => async dispatch => {
    const res = await fetch(`/api/bookings`, {
        method: 'POST',
        body: JSON.stringify({ booking })
    });
    if (res.ok) {
        const retBook3 = res.data.booking;
        dispatch(booking(retBook3));
    }
    return res;
}
export const modifyOneB = (booking) => async dispatch => {
    const res = await fetch(`/api/bookings`, {
        method: 'PATCH',
        body: JSON.stringify({ booking })
    });
    if (res.ok) {
        const retBook4 = res.data.booking;
        dispatch(booking(retBook4));
    }
    return res.data.booking;
}
export const deleteOneB = (bookingId) => async dispatch => {
    const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        const retBook5 = Number(res.data.bookingId);
        dispatch(removeBooking(retBook5));
    }
    return res;
}

const initialState = [];

const compare = (book1, book2) => {
    let comparison = 0;
    if (book1.id > book2.id) {
        comparison = 1;
    } else if (book1.id < book2.id) {
        comparison = -1;
    }
    return comparison;
}

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case BOOKING:
            newState = JSON.parse(JSON.stringify(state.filter(book => book.id !== action.booking.id)));
            newState.push(JSON.parse(JSON.stringify(action.booking)));
            return newState.sort(compare);
        case ALLBOOKINGS:
            // newState = JSON.parse(JSON.stringify([...state, ...action.bookings]));
            newState = JSON.parse(JSON.stringify([...action.bookings]));
            return newState.sort(compare);
        case REMOVEBOOKING:
            newState = JSON.parse(JSON.stringify(state.filter(book =>
                book.id !== action.bookingId
            )));
            return newState.sort(compare);
        default:
            return state;
    }
};

export default bookingReducer;
