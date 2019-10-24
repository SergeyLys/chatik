import {DialogTypes} from "./constants";
import {DialogActionTypes} from "./actions";
import {Dialog, Message, User} from "../types";

export interface DialogsState {
    friends: User[];
    dialog: Dialog | {};
    messages: Message[];
}

type ActionTypes = DialogActionTypes;

const initialState = {
    friends: [],
    dialog: {},
    messages: []
};

export const DialogReducers = (state: DialogsState = initialState, action: ActionTypes): DialogsState => {
    switch (action.type) {
        case DialogTypes.USERS_FETCHED: {
            return {
                ...state,
                friends: action.users
            }
        }
        case DialogTypes.USER_DISCONNECTED: {
            return {
                ...state,
                friends: state.friends.filter((friend: User) => friend.email !== action.email)
            }
        }
        case DialogTypes.FETCH_DIALOG: {
            return {
                ...state,
                dialog: {}
            }
        }
        case DialogTypes.FETCH_DIALOG_SUCCESS: {
            return {
                ...state,
                dialog: action.dialog,
                messages: action.messages
            }
        }
        case DialogTypes.RECEIVE_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        }
        default: return state;
    }
};