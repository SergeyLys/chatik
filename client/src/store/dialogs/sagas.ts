import {takeLatest, call, put} from "@redux-saga/core/effects";
import {DialogTypes} from "./constants";
import {FetchDialog, fetchDialogSuccess, PostMessage, receiveMessage} from "./actions";
import endpoints from "../../constants/endpoints";
import {httpService} from "../../services/httpService";


function* fetchDialog(action: FetchDialog) {
    try {
        const response = yield call(httpService, {
            ...endpoints.fetchDialog,
            params: {
                partnerId: action.partnerId
            }
        });
        yield put(fetchDialogSuccess(response.data));
    } catch (e) {

    }
}

function* sendMessage(action: PostMessage) {
    try {
        const response = yield call(httpService, {
            ...endpoints.sendMessage,
            data: {
               text: action.text,
               dialogId: action.dialog
            }
        });
        yield put(receiveMessage(response.data.message));
    } catch (e) {

    }
}

export function* dialogsSaga() {
    yield takeLatest(DialogTypes.FETCH_DIALOG, fetchDialog);
    yield takeLatest(DialogTypes.POST_MESSAGE, sendMessage);
}