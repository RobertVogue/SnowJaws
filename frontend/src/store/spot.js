import csrfFetch from './csrf';
const SPOTS = 'spot/setSpots';
const SPOTREVIEW = 'spots/SPOTREVIEW'
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
export const addReview = (startReview, spotId, userId) => {
    return async (dispatch) => {
        const res = await csrfFetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({startReview, spotId, userId})
        });
        const data = await res.json()
        dispatch(setSpots(data.spots))
    }
}

const alpha = [];
export default function spotReducer (state = alpha, action) {
    let beta;
    switch (action.type) {
        case SPOTS:
            beta = action.spot
            return beta
        case SPOTREVIEW:
            return {
                ...state,
                reviews: action.reviews
            }
        default:
            return state;
    }
}
