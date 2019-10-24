import {DialogTypes as types} from '../constants';
import {Dialog, Message, User} from "../../types";

export interface UsersFetched {
    type: types.USERS_FETCHED;
    users: User[];
}

export interface UsersDisconnected {
    type: types.USER_DISCONNECTED;
    email: string;
}

export interface FetchDialog {
    type: types.FETCH_DIALOG;
    partnerId: number;
}

export interface FetchDialogSuccess {
    type: types.FETCH_DIALOG_SUCCESS;
    dialog: Dialog;
    messages: Message[];
}

export interface PostMessage {
    type: types.POST_MESSAGE;
    text: string;
    dialog: number;
    author: number;
}

export interface ReceiveMessage {
    type: types.RECEIVE_MESSAGE;
    message: Message;
}


export const userFetched = (users: User[]): UsersFetched => ({
    type: types.USERS_FETCHED,
    users
});

export const userDisconnected = (email: string): UsersDisconnected => ({
    type: types.USER_DISCONNECTED,
    email
});

export const fetchDialog = ({partnerId}: {partnerId: number}): FetchDialog => ({
    type: types.FETCH_DIALOG,
    partnerId
});

export const fetchDialogSuccess = ({dialog, messages}: {dialog: Dialog, messages: Message[]}): FetchDialogSuccess => ({
    type: types.FETCH_DIALOG_SUCCESS,
    dialog,
    messages
});

export const sendMessage = ({text, dialog, author}: Message): PostMessage => ({
    type: types.POST_MESSAGE,
    text, dialog, author
});

export const receiveMessage = (message: Message): ReceiveMessage => ({
    type: types.RECEIVE_MESSAGE,
    message
});

export type DialogActionTypes = UsersFetched & UsersDisconnected & FetchDialog & FetchDialogSuccess & PostMessage & ReceiveMessage;