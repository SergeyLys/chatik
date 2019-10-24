import {AuthTypes as types} from '../constants';
import {IError, User} from "../../types";

export interface SignInRequest {
    type: types.SIGNIN_REQUEST;
    email: string;
    password: string;
}

export interface SignInSuccess {
    type: types.SIGNIN_SUCCESS;
    user: User;
}

export interface SignInFailure {
    type: types.SIGNIN_FAILURE;
    status: number;
    message: string;
}

export const signIn = ({email, password}: {email: string, password: string}): SignInRequest => ({
    type: types.SIGNIN_REQUEST,
    email, password
});

export const signedIn = (user: User): SignInSuccess => ({
    type: types.SIGNIN_SUCCESS,
    user
});

export const signInFailure = ({status, message}: IError): SignInFailure => ({
    type: types.SIGNIN_FAILURE,
    status,
    message
});

export type SigninActionTypes = SignInRequest | SignInSuccess | SignInFailure;