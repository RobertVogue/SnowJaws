const SETRATING = 'rating/SETRATING';
export const setRating = (rating) => ({
  type: SET_ONE_RATING,
  rating
});
const initialState = [];
const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETRATING:
      return [action.rating];
    default:
      return state;
  }
};
export default ratingReducer;
