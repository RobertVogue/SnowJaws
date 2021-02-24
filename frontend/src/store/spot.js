import csrfFetch from './csrf';
const SPOTS = 'spot/setSpots';

const setSpots = (spot) => ({
    type: SPOTS,
    spot

});

export const FetchSpots = () => {
    return async (dispatch) => {
        const res = await csrfFetch('/api/spots')
        const data = await res.json()
        dispatch(setSpots(data.spots))
        return data
    }
}

const alpha = [];
export default function spotReducer (state = alpha, action) {
    let beta;
    switch (action.type) {
        case SPOTS:
            beta = [...state, ...action.spot]
            return beta
        default:
            return state;
    }
}
