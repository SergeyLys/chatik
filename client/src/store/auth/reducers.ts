import {AuthTypes} from "./constants";
import {SigninActionTypes, SignoutActionTypes, SignupActionTypes, UploadUserImageActionTypes} from "./actions";
import {CheckUserActionTypes} from "./actions";
import {IError, User} from "../types";

export interface AuthErrorsState {
    [AuthTypes.SIGNIN_FAILURE]: IError;
    [AuthTypes.SIGNUP_FAILURE]: IError;
    [AuthTypes.CHECK_USER_FAILURE]: IError;
}

export interface AuthLoadingState {
    [AuthTypes.CHECK_USER_REQUEST]: boolean;
    [AuthTypes.SIGNIN_REQUEST]: boolean;
    [AuthTypes.SIGNUP_REQUEST]: boolean;
}

export interface AuthorizationState {
    user: User | {};
    loading: AuthErrorsState | {};
    errors: AuthLoadingState | {};
}

type ActionTypes = SignupActionTypes | SigninActionTypes | SignoutActionTypes | CheckUserActionTypes | UploadUserImageActionTypes;

const initialState = {
    user: {},
    errors: {},
    loading: {}
};

export const AuthReducers = (state: AuthorizationState = initialState, action: ActionTypes): AuthorizationState => {
    switch (action.type) {
        case AuthTypes.SIGNIN_REQUEST: {
            return {
                ...state,
                loading: {
                    [action.type]: true
                }
            }
        }
        case AuthTypes.SIGNIN_SUCCESS: {
            return {
                errors: {},
                user: action.user,
                loading: {}
            };
        }
        case AuthTypes.SIGNIN_FAILURE: {
            return {
                errors: {
                    [action.type]: {
                        status: action.status,
                        message: action.message
                    }
                },
                user: {},
                loading: {}
            };
        }
        case AuthTypes.SIGNUP_REQUEST: {
            return {
                ...state,
                loading: {
                    [action.type]: true
                }
            }
        }
        case AuthTypes.SIGNUP_SUCCESS: {
            return {
                errors: {},
                user: action.user,
                loading: {}
            };
        }
        case AuthTypes.SIGNUP_FAILURE: {
            return {
                errors: {
                    [action.type]: {
                        status: action.status,
                        message: action.message
                    }
                },
                user: {},
                loading: {}
            };
        }

        case AuthTypes.SIGNOUT_SUCCESS: {
            return {
                errors: {},
                user: {},
                loading: {}
            };
        }
        case AuthTypes.CHECK_USER_REQUEST: {
            return {
                errors: {},
                user: {},
                loading: {
                    [action.type]: true
                }
            };
        }
        case AuthTypes.CHECK_USER_SUCCESS: {
            return {
                errors: {},
                user: action.user,
                loading: {}
            };
        }
        case AuthTypes.CHECK_USER_FAILURE: {
            return {
                errors: {
                    [action.type]: {
                        message: action.message,
                        status: action.status
                    }
                },
                user: {},
                loading: {}
            };
        }
        case AuthTypes.UPLOAD_USER_IMAGE_REQUEST: {
            return {
                errors: {},
                user: {},
                loading: {
                    [action.type]: true
                }
            };
        }
        case AuthTypes.UPLOAD_USER_IMAGE_SUCCESS: {
            return {
                errors: {},
                user: action.user,
                loading: {}
            };
        }
        case AuthTypes.UPLOAD_USER_IMAGE_FAILURE: {
            return {
                errors: {
                    [action.type]: {
                        message: action.message,
                        status: action.status
                    }
                },
                user: {},
                loading: {}
            };
        }
        default: return state;
    }
};