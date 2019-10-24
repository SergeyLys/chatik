import {AuthTypes as types} from '../constants';
import {IError} from "../../types";

export interface SignoutRequest {
    type: types.SIGNOUT_REQUEST;
}

export interface SignoutSuccess {
    type: types.SIGNOUT_SUCCESS;
}

export interface SignoutFailure {
    type: types.SIGNOUT_FAILURE;
    status: number;
    message: string;
}

export const signOut = (): SignoutRequest => ({
    type: types.SIGNOUT_REQUEST
});

export const signedOut = (): SignoutSuccess => ({
    type: types.SIGNOUT_SUCCESS
});

export const signOutFailure = ({status, message}: IError): SignoutFailure => ({
    type: types.SIGNOUT_FAILURE,
    status,
    message
});

export type SignoutActionTypes = SignoutRequest | SignoutSuccess | SignoutFailure;