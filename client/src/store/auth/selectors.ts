import {RootState} from "../index";

export const getCurrentUser = (state: RootState) => {
    return state.authorization.user;
};