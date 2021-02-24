const ADMIN = 'admin/ADMIN';
const STOPADMIN = 'admin/STOPADMIN';

export const admin = (adm) => ({
    type: ADMIN,
    adm
});

export const stopAdmin = () => ({
    type: STOPADMIN
});

const initialState = [];

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN:
            return [action.admin];
        default:
            return state;
    }
};

export default adminReducer;
