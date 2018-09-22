/// <reference path="../store.model.ts" />
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { FSAction } from '../store.model'
import { IJobDetails } from "../../components/shared/model/IJobDetails";

@Injectable()
export class Description_Actions {
    static readonly ActionTypes = {
        GET_Description_STATE: 'DESCRIPTION/GET_Description_STATE',
        GET_Description_STARTED: 'DESCRIPTION/GET_Description_STARTED',
        GET_Description_SUCCEEDED: 'DESCRIPTION/GET_Description_SUCCEEDED',
        GET_Description_FAILED: 'DESCRIPTION/GET_Description_FAILED',
        SAVE_Description_STATE: 'DESCRIPTION/SAVE_Description_STATE',
        SAVE_Description_STARTED: 'DESCRIPTION/SAVE_Description_STARTED',
        SAVE_Description_SUCCEEDED: 'DESCRIPTION/SAVE_Description_SUCCEEDED',
        SAVE_Description_FAILED: 'DESCRIPTION/SAVE_Description_FAILED',
        DELETE_Description_STATE: 'DESCRIPTION/DELETE_Description_STATE',
        DELETE_Description_STARTED: 'DESCRIPTION/DELETE_Description_STARTED',
        DELETE_Description_SUCCEEDED: 'DESCRIPTION/DELETE_Description_SUCCEEDED',
        DELETE_Description_FAILED: 'DESCRIPTION/DELETE_Description_FAILED',
        LIKE_Description_STATE: 'DESCRIPTION/LIKE_Description_STATE',
        LIKE_Description_STARTED: 'DESCRIPTION/LIKE_Description_STARTED',
        LIKE_Description_SUCCEEDED: 'DESCRIPTION/LIKE_Description_SUCCEEDED',
        LIKE_Description_FAILED: 'DESCRIPTION/LIKE_Description_FAILED',
        DescritionCommentFocus_True: 'DESCRIPTION/DescritionCommentFocus_True',
        DescritionCommentFocus_False: 'DESCRIPTION/DescritionCommentFocus_Flase',
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

    @dispatch()
    public likeDescription = (payload: IJobDetails): FSAction => ({
        type: Description_Actions.ActionTypes.LIKE_Description_STATE,
        meta: {},
        payload: payload,
    })
    public likeDescriptionStarted = (): FSAction => ({
        type: Description_Actions.ActionTypes.LIKE_Description_STARTED,
        meta: {},
        payload: null,
    })

    public likeDescriptionSucceeded = (payload: IJobDetails): FSAction => ({
        type: Description_Actions.ActionTypes.LIKE_Description_SUCCEEDED,
        meta: {},
        payload: payload,
    })
    public likeDescriptionFailed = (error: any): FSAction => ({
        type: Description_Actions.ActionTypes.LIKE_Description_FAILED,
        meta: {},
        payload: error,
        error: true,
    })

    @dispatch()
    public descritionCommentFocus_True = (): FSAction => ({
        type: Description_Actions.ActionTypes.DescritionCommentFocus_True,
        meta: {},
        payload: null,
    })

    @dispatch()
    public descritionCommentFocus_False = (): FSAction => ({
        type: Description_Actions.ActionTypes.DescritionCommentFocus_False,
        meta: {},
        payload: null,
    })
    
};