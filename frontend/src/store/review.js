import fetch from './csrf';

const REVIEW = 'review/REVIEW';
const ALLREVIEWS = 'review/ALLREVIEWS';

const review = (review) => ({
    type: REVIEW,
    review
});
const allReviews = (reviews) => ({
    type: ALLREVIEWS,
    reviews
});
export const getOneR = (id) => async dispatch => {
    const res = await fetch(`/api/reviews/${id}`, {
    });
    if (res.ok) {
        const retRev = res.data.review;
        dispatch(review(retRev));
    }
    return res;
}
export const getAllR = () => async dispatch => {
    const res = await fetch(`/api/reviews`, {
    });
    if (res.ok) {
        const retRev2 = res.data.reviews;
        dispatch(allReviews(retRev2));
    }
    return res;
}
export const createOneR = ({ review }) => async dispatch => {
    const res = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ review })
    });
    if (res.ok) {
        const retRev3 = res.data.review;
        dispatch(review(retRev3));
    }
    return res;
}
const initialState = [];
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case REVIEW:
            newState = JSON.parse(JSON.stringify(state));
            newState.push(JSON.parse(JSON.stringify(action.review)));
            return newState;
        case ALLREVIEWS:
            newState = JSON.parse(JSON.stringify([...action.reviews]));
            return newState;
        default:
            return state;
    }
};
export default reviewReducer;
