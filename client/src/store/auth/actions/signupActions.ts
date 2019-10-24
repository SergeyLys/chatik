import {AuthTypes as types} from '../constants';
import {IError, User} from "../../types";

export interface SignupRequest {
    type: types.SIGNUP_REQUEST;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface SignupSuccess {
    type: types.SIGNUP_SUCCESS;
    user: User;
}

export interface SignupFailure {
    type: types.SIGNUP_FAILURE;
    status: number;
    message: string;
}

export const signup = (
    {firstName, lastName, email, password}:
        {firstName: string, lastName: string, email: string, password: string}): SignupRequest => ({
    type: types.SIGNUP_REQUEST,
    firstName,
    lastName, email, password
});

export const signedup = (user: User): SignupSuccess => ({
    type: types.SIGNUP_SUCCESS,
    user
});

export const signupFailure = ({status, message}: IError): SignupFailure => ({
    type: types.SIGNUP_FAILURE,
    status,
    message
});

export type SignupActionTypes = SignupRequest | SignupSuccess | SignupFailure;