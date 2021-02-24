import fetch from './csrf';

const SPOT = 'spot/SPOT';
const REMOVESPOT = 'spot/REMOVESPOT';
const ALLSPOTS = 'spot/ALLSPOTS';
const ALLMYSPOTS = 'spot/ALLMYSPOTS';
const REVIEWSPOT = 'spot/REVIEWSPOT';

export const spot = (spot) => ({
    type: SPOT,
    spot
});
export const allSpotsS = (spots) => ({
    type: ALLSPOTS,
    spots
});
export const allMySpots = (spots) => ({
    type: ALLMYSPOTS,
    spots
});
export const removeSpot = () => ({
    type: REMOVESPOT
});

export const reviewSpot = (review) => ({
    type: REVIEWSPOT,
    review
});

export const getOneS = (id, withReviews = false) => async dispatch => {
    let link = `/api/spots/${id}`;
    if (withReviews) link += '/reviews';
    const res = await fetch(link, {
    });
    if (res.ok) {
        const retSpot = res.data;
        dispatch(spot(retSpot));
    }
    return res;
}

export const getAllS = (withReviews = false) => async dispatch => {
    let link = '/api/spots';
    if (withReviews) link += '/reviews';
    const res = await fetch(link, {
    });
    if (res.ok) {
        const retSpot2 = res.data;
        dispatch(allSpotsS(retSpot2));
    }
    return res;
}

export const createOneS = ({ spot }) => async dispatch => {
    const res = await fetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify({ spot })
    });
    if (res.ok) {
        const retSpot3 = res.data.spot;
        dispatch(spot(retSpot3));
    }
    return res;
}


const initialState = { allSpots: [] };

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SPOT:
            newState = Object.assign({}, state);
            if (!newState.allSpots.includes(action.spot))
                newState.allSpots.push(action.spot);
            newState.currentSpot = action.spot;
            return newState;
        case ALLSPOTS:
            newState = Object.assign({}, state);
            delete newState.currentSpot;
            newState.allSpots = [...action.spots];
            return newState;
        case ALLMYSPOTS:
            newState = Object.assign({}, state);
            newState.allMySpots = [...action.spots];
            return newState;
        case REMOVESPOT:
            newState = Object.assign({}, state);
            delete newState.currentSpot;
            return newState;
        case REVIEWSPOT:
            newState = Object.assign({}, state);
            const spot = state.allSpots.find(spot => spot.id === action.review.spotId);
            if (spot) {
                spot.Reviews.push(action.review);
                state.allSpots = state.allSpots.filter(spot => spot.id !== action.review.spotId);
                state.allSpots.push(spot);
            }
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
