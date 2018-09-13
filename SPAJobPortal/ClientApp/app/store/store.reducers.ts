/// <reference path="description/description.action.ts" />
import { combineReducers, Reducer, Action } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { activedescriptionJobDetails, descriptionJobDetail } from './description/description.reducer'
import { ClientState, FSAction } from './store.model'
import { FluxStandardAction } from 'flux-standard-action';
import { Description_Actions } from './description/description.action';

//factory Reducer to create reducers of generic type
function factory_RootClientState_Reducer<T>(defaultValue: any) {
    return function (state: ClientState<T> = defaultValue, action: any): ClientState<T> {
        switch (action.type) {
            case Description_Actions.ActionTypes.SAVE_Description_STARTED:
            case Description_Actions.ActionTypes.DELETE_Description_STARTED:
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
            case Description_Actions.ActionTypes.SAVE_Description_SUCCEEDED:
            case Description_Actions.ActionTypes.DELETE_Description_SUCCEEDED:
                return {
                    ...state,
                    state: action.payload,
                    loading: false,
                    error: null,
                };
            case Description_Actions.ActionTypes.SAVE_Description_FAILED:
            case Description_Actions.ActionTypes.DELETE_Description_FAILED:

                return {
                    ...state,
                    loading: false,
                    error: action.payload.status != undefined ? "Status:" + action.payload.status : "" + " Message:" + action.payload.message,
                };
        }
        return state;
    };
}


function dummyReducer(state: any = null, action: FSAction) {
    return state;
}
// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
        activedescriptionJobDetails,
        descriptionJobDetail
    })
);




//asdf: factory_RootClientState_Reducer2(),
//       

