import csrfFetch from './csrf';

const REVIEW = 'review/review';

const review = (rev) => ({
    type: REVIEW,
    rev
});

export const getReview = (id) => {
    return async (dispatch) => {
        const res = await csrfFetch(`/api/review/${id}`);
        const data = await res.json();
        dispatch(review(data.review));
        return data;
    }
}

const alpha = [];
const reviewReducer = (state = alpha, action) => {
    let beta;
    switch (action.type) {
        case REVIEW:
            beta = [...state, ...action.review]
            return beta;
        default:
            return state;
    }
};
export default reviewReducer;
