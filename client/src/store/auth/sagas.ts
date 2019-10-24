import {takeLatest, call, put, select} from 'redux-saga/effects';
import {AuthTypes} from "./constants";
import {
    checkUserSuccess,
    checkUserFailure,
    signedIn,
    signInFailure,
    SignInRequest,
    CheckUserRequest,
    signupFailure,
    signedup,
    signedOut,
    signOutFailure,
    SignoutRequest,
    SignupRequest,
    UploadUserImageRequest,
    uploadUserImageSuccess,
    uploadUserImageFailure
} from "./actions";
import {httpService} from "../../services/httpService";
import endpoints from "../../constants/endpoints";
import {socketInstance} from "../../services/socket";
import {getCurrentUser} from "./selectors";
import {User} from "../types";

function* checkUser(action: CheckUserRequest) {
    try {
        const auth = yield call(httpService, endpoints.checkUser);
        yield put(checkUserSuccess(auth.data));
    } catch (e) {
        document.cookie = 'usertoken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        yield put(checkUserFailure({status: e.response.status, message: e.response.data.message}));
    }
}

function* signIn(action: SignInRequest) {
    try {
        const authData = yield call(httpService, {
            ...endpoints.signIn,
            data: {
                email: action.email,
                password: action.password
            }
        });
        document.cookie = `usertoken=${authData.data.token}`;
        yield put(signedIn(authData.data.user));
    } catch (e) {
        yield put(signInFailure({status: e.response.status, message: e.response.data.message}));
    }
}

function* signUp(action: SignupRequest) {
    try {
        const authData = yield call(httpService, {
            ...endpoints.signUp,
            data: {
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                password: action.password
            }
        });
        document.cookie = `usertoken=${authData.data.token}`;
        yield put(signedup(authData.data.data.user));
    } catch (e) {
        yield put(signupFailure({status: e.response.status, message: e.response.data.message}));
    }
}

function* signOut(action: SignoutRequest) {
    try {
        const {email}: User = yield select(getCurrentUser);
        yield put(signedOut());
        socketInstance.socket.emit('user_disconnected', {
            email
        });
        socketInstance.socket.close();
        document.cookie = 'usertoken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } catch (e) {
        yield put(signOutFailure({status: e.response.status, message: e.response.data.message}));
    }
}

function* uploadUserImage(action: UploadUserImageRequest) {
    try {
        const data = new FormData();
        data.append('image', action.file);

        const authData = yield call(httpService, {
            ...endpoints.uploadUserImage,
            data
        });

        yield put(uploadUserImageSuccess(authData.data));
    } catch (e) {
        yield put(uploadUserImageFailure({status: e.response.status, message: e.response.data.message}));
    }
}

export function* authSaga() {
    yield takeLatest(AuthTypes.SIGNIN_REQUEST, signIn);
    yield takeLatest(AuthTypes.SIGNUP_REQUEST, signUp);
    yield takeLatest(AuthTypes.SIGNOUT_REQUEST, signOut);
    yield takeLatest(AuthTypes.CHECK_USER_REQUEST, checkUser);
    yield takeLatest(AuthTypes.UPLOAD_USER_IMAGE_REQUEST, uploadUserImage);
}