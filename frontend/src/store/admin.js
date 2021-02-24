const ADMIN = 'admin/ADMIN';

export const admin = (adm) => ({
    type: ADMIN,
    adm
});

const initial = [];

const adminReducer = (state = initial, action) => {
    switch (action.type) {
        case ADMIN:
            return [action.admin];
        default:
            return state;
    }
};

export default adminReducer;
