import {AuthTypes as types} from '../constants';
import {IError, User} from "../../types";

export interface UploadUserImageRequest {
    type: types.UPLOAD_USER_IMAGE_REQUEST;
    file: File;
}

export interface UploadUserImageSuccess {
    type: types.UPLOAD_USER_IMAGE_SUCCESS;
    user: User;
}

export interface UploadUserImageFailure {
    type: types.UPLOAD_USER_IMAGE_FAILURE;
    status: number;
    message: string;
}

export const uploadUserImageRequest = (file: File): UploadUserImageRequest => ({
    type: types.UPLOAD_USER_IMAGE_REQUEST,
    file
});

export const uploadUserImageSuccess = (user: User): UploadUserImageSuccess => ({
    type: types.UPLOAD_USER_IMAGE_SUCCESS,
    user
});

export const uploadUserImageFailure = ({status, message}: IError): UploadUserImageFailure => ({
    type: types.UPLOAD_USER_IMAGE_FAILURE,
    status,
    message
});

export type UploadUserImageActionTypes = UploadUserImageRequest | UploadUserImageSuccess | UploadUserImageFailure;