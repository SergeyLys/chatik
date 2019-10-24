import {Method} from "../services/httpService";

export interface EntityEndpoints {
    [key: string]: {
        url: string;
        method: Method;
    };
}

export default {
    signIn: {
        method: 'POST',
        url: 'api/signin'
    },
    signUp: {
        method: 'POST',
        url: 'api/signup'
    },
    checkUser: {
        method: 'GET',
        url: 'api/current-user'
    },
    uploadUserImage: {
        method: 'PUT',
        url: 'api/update-image'
    },
    fetchDialog: {
        method: 'GET',
        url: 'api/dialogs'
    },
    sendMessage: {
        method: 'POST',
        url: 'api/message'
    }
} as EntityEndpoints;