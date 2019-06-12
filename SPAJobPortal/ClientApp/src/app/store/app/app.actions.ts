/// <reference path="../store.model.ts" />
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FSAction } from '../store.model'
import { IJobDetails } from "../../components/shared/model/IJobDetails";

@Injectable()
export class App_Actions {
  static readonly ActionTypes = {
    APP_On_Load: 'APP/APP_On_Load',
    APP_GET_UserInfo_STATE: 'APP/GET_UserInfo_STATE',
    APP_GET_UserInfo_STARTED: 'APP/GET_UserInfo_STARTED',
    APP_GET_UserInfo_SUCCEEDED: 'APP/GET_UserInfo_SUCCEEDED',
    APP_GET_UserInfo_FAILED: 'APP/GET_UserInfo_FAILED',
  };


  @dispatch()
  public appOnLoad = (): FSAction => ({
    type: App_Actions.ActionTypes.APP_GET_UserInfo_STATE,
    meta: null,
    payload: null,
  })

  @dispatch()
  public getUserInfo = (): FSAction => ({
    type: App_Actions.ActionTypes.APP_GET_UserInfo_STATE,
    meta: null,
    payload: null,
  })
  public getUserInfoStarted = (): FSAction => ({
    type: App_Actions.ActionTypes.APP_GET_UserInfo_STARTED,
    meta: null,
    payload: null,
  })

  public getUserInfoSucceeded = (payload: any): FSAction => ({
    type: App_Actions.ActionTypes.APP_GET_UserInfo_SUCCEEDED,
    meta: null,
    payload: payload,
  })
  public getUserInfoFailed = (error: any): FSAction => ({
    type: App_Actions.ActionTypes.APP_GET_UserInfo_FAILED,
    meta: null,
    payload: error,
    error: true,
  })
}
