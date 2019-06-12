import { Injectable } from '@angular/core';
import { Epic, combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, mergeMap, catchError, startWith } from 'rxjs/operators';
import { App_Actions } from './app.actions';
import { Router } from '@angular/router';
import { IAppState, FSAction } from '../store.model';
import { SearchInfoService } from '../../components/shared/services/search.service';
import { Action } from 'redux';
import { App_Service } from './app.service';

//type Predicate = (any) => boolean;

@Injectable()
export class App_Epics {
  constructor(private app_Service: App_Service, private _router: Router, private actions: App_Actions) { }

  app_OnLoad_EPIC: Epic<FSAction, FSAction, IAppState, any> = (action$, store) => action$
    .ofType(App_Actions.ActionTypes.APP_On_Load).pipe(
      switchMap(() =>
        of(this.actions.getUserInfo())
      ));


  getUserInfo_EPIC: Epic<FSAction, FSAction, IAppState, any> = (action$, store) => action$
    .ofType(App_Actions.ActionTypes.APP_GET_UserInfo_STATE).pipe(
      switchMap(a => this.app_Service.getUserInformation().pipe(
        map(data => this.actions.getUserInfoSucceeded(data)),
        catchError(response => of(this.actions.getUserInfoFailed({
          status: response.status,
          message: response.message
        }))),
        startWith(this.actions.getUserInfoStarted()))
      ));

  public getRootEpic(): Epic<Action, Action, any, any>[] {
    return [
      this.getUserInfo_EPIC
    ];
  }
}
