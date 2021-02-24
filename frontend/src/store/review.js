import fetch from './csrf';

const REVIEW = 'review/REVIEW';

const review = (rev) => ({
    type: REVIEW,
    rev
});

export const getReview = (id) => async dispatch => {
    const res = await fetch(`/api/review/${id}`);
    if (res.ok) {
        const retRev = res.data.review;
        dispatch(review(retRev));
    }
    return res;
}

const initial = [];
const reviewReducer = (state = initial, action) => {
    let newState;
    switch (action.type) {
        case REVIEW:
            newState = JSON.parse(JSON.stringify(state));
            newState.push(JSON.parse(JSON.stringify(action.review)));
            return newState;
        default:
            return state;
    }
};
export default reviewReducer;
