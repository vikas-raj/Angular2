import { IJobDetails } from "../../components/shared/model/IJobDetails";
import { Reducer } from 'redux';
import { FSAction, ClientState } from '../store.model';
import { FluxStandardAction } from 'flux-standard-action';
import { Description_Actions } from './description.action';



const descriptionJobDetails: ClientState<any> = { state: null, loading: false, error: '' };

export const activedescriptionJobDetails: Reducer<ClientState<IJobDetails>> = (state: ClientState<IJobDetails> = descriptionJobDetails, action: FSAction): ClientState<IJobDetails> => {
    switch (action.type) {
        case Description_Actions.ActionTypes.GET_Description_STARTED:
        case Description_Actions.ActionTypes.SAVE_Description_STARTED:
        case Description_Actions.ActionTypes.DELETE_Description_STARTED:
            return {
                ...state,
                loading: true,
                error: null,
            };
        default: return state;
    }
}

export const descriptionJobDetail = (state: any = null, action: FSAction): IJobDetails => {
    switch (action.type) {
        case Description_Actions.ActionTypes.GET_Description_SUCCEEDED:
        case Description_Actions.ActionTypes.SAVE_Description_SUCCEEDED:
        case Description_Actions.ActionTypes.DELETE_Description_SUCCEEDED:
        case Description_Actions.ActionTypes.LIKE_Description_SUCCEEDED:
            return action.payload as IJobDetails;
        default: return state;
    }
};