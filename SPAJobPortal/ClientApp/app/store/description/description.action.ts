/// <reference path="../store.model.ts" />
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { FSAction } from '../store.model'
import { IJobDetails } from "../../components/shared/model/IJobDetails";

@Injectable()
export class Description_Actions {
    static readonly ActionTypes = {
        GET_Description_STATE: 'MERCURY/GET_Description_STATE',
        GET_Description_STARTED: 'MERCURY/GET_Description_STARTED',
        GET_Description_SUCCEEDED: 'MERCURY/GET_Description_SUCCEEDED',
        GET_Description_FAILED: 'MERCURY/GET_Description_FAILED',
        SAVE_Description_STATE: 'MERCURY/SAVE_Description_STATE',
        SAVE_Description_STARTED: 'MERCURY/SAVE_Description_STARTED',
        SAVE_Description_SUCCEEDED: 'MERCURY/SAVE_Description_SUCCEEDED',
        SAVE_Description_FAILED: 'MERCURY/SAVE_Description_FAILED',
        DELETE_Description_STATE: 'MERCURY/DELETE_Description_STATE',
        DELETE_Description_STARTED: 'MERCURY/DELETE_Description_STARTED',
        DELETE_Description_SUCCEEDED: 'MERCURY/DELETE_Description_SUCCEEDED',
        DELETE_Description_FAILED: 'MERCURY/DELETE_Description_FAILED',
    };

    @dispatch()
    public getDescription = (payload: string): FSAction => ({
        type: Description_Actions.ActionTypes.GET_Description_STATE,
        meta: {},
        payload: payload,
    })
    public getDescriptionStarted = (): FSAction => ({
        type: Description_Actions.ActionTypes.GET_Description_STARTED,
        meta: {},
        payload: null,
    })

    public getDescriptionSucceeded = (payload: IJobDetails): FSAction => ({
        type: Description_Actions.ActionTypes.GET_Description_SUCCEEDED,
        meta: {},
        payload: payload,
    })
    public getDescriptionFailed = (error: any): FSAction => ({
        type: Description_Actions.ActionTypes.GET_Description_FAILED,
        meta: {},
        payload: error,
        error: true,
    })

    @dispatch()
    public saveDescription = (payload: IJobDetails): FSAction => ({
        type: Description_Actions.ActionTypes.SAVE_Description_STATE,
        meta: {},
        payload: payload,
    })
    public saveDescriptionStarted = (): FSAction => ({
        type: Description_Actions.ActionTypes.SAVE_Description_STARTED,
        meta: {},
        payload: null,
    })

    public saveDescriptionSucceeded = (payload: IJobDetails): FSAction => ({
        type: Description_Actions.ActionTypes.SAVE_Description_SUCCEEDED,
        meta: {},
        payload: payload,
    })
    public saveDescriptionFailed = (error: any): FSAction => ({
        type: Description_Actions.ActionTypes.SAVE_Description_FAILED,
        meta: {},
        payload: error,
        error: true,
    })

    @dispatch()
    public deleteDescription = (payload: string): FSAction => ({
        type: Description_Actions.ActionTypes.DELETE_Description_STATE,
        meta: {},
        payload: payload,
    })
    public deleteDescriptionStarted = (): FSAction => ({
        type: Description_Actions.ActionTypes.DELETE_Description_STARTED,
        meta: {},
        payload: null,
    })

    public deleteDescriptionSucceeded = (payload: IJobDetails): FSAction => ({
        type: Description_Actions.ActionTypes.DELETE_Description_SUCCEEDED,
        meta: {},
        payload: payload,
    })
    public deleteDescriptionFailed = (error: any): FSAction => ({
        type: Description_Actions.ActionTypes.DELETE_Description_FAILED,
        meta: {},
        payload: error,
        error: true,
    })
};