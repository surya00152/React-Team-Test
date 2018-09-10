import {
  USER_DETAILS_SET
} from './actions';


export const userDetails = (state = null, action) => {
    switch (action.type) {
        case USER_DETAILS_SET:
            return action.data;

        default:
            return state;
    }
};
