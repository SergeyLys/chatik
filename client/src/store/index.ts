import {createStore, applyMiddleware, combineReducers} from 'redux'
import {all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "redux-devtools-extension";
import {AuthorizationState, AuthReducers, authSaga} from './auth';
import {DialogsState, DialogReducers, dialogsSaga} from "./dialogs";

function* rootSaga() {
    yield all([
        authSaga(),
        dialogsSaga()
    ]);
}

export interface RootState {
    authorization: AuthorizationState,
    dialogs: DialogsState,
}

const rootReducer = combineReducers({
    authorization: AuthReducers,
    dialogs: DialogReducers
});

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}