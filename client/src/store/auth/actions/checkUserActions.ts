import {AuthTypes as types} from '../constants';
import {IError, User} from "../../types";

export interface CheckUserRequest {
    type: types.CHECK_USER_REQUEST;
}

export interface CheckUserSuccess {
    type: types.CHECK_USER_SUCCESS;
    user: User;
}

export interface CheckUserFailure {
    type: types.CHECK_USER_FAILURE;
    status: number;
    message: string;
}

export const checkUserRequest = (): CheckUserRequest => ({
    type: types.CHECK_USER_REQUEST
});

export const checkUserSuccess = (user: User): CheckUserSuccess => ({
    type: types.CHECK_USER_SUCCESS,
    user
});

export const checkUserFailure = ({status, message}: IError): CheckUserFailure => ({
    type: types.CHECK_USER_FAILURE,
    status,
    message
});

export type CheckUserActionTypes = CheckUserRequest | CheckUserSuccess | CheckUserFailure;