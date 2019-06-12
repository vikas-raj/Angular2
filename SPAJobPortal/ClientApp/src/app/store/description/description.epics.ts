import { Injectable } from '@angular/core';
import { Epic, combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import { map, switchMap, mergeMap, catchError, startWith } from 'rxjs/operators';
import { Description_Actions } from './description.action';
import { Router } from '@angular/router';
import { IAppState, FSAction } from '../store.model';
import { SearchInfoService } from '../../components/shared/services/search.service';
import { Action } from 'redux';

//type Predicate = (any) => boolean;

@Injectable()
export class Description_Epics {
  constructor(private searchInfoService: SearchInfoService, private _router: Router, private actions: Description_Actions) { }

  getDescription_EPIC: Epic<FSAction, FSAction, IAppState, any> = (action$, store) => action$
    .ofType(Description_Actions.ActionTypes.GET_Description_STATE).pipe(
      switchMap(a => this.searchInfoService.getDescriptionById(a.payload).pipe(
        map(data => this.actions.getDescriptionSucceeded(data)),
        catchError(response => of(this.actions.getDescriptionFailed({
          status: response.status,
          message: response.message
        }))),
        startWith(this.actions.getDescriptionStarted()))
      ));

  public saveDescription_EPIC: Epic<FSAction, FSAction, IAppState, any> = (action$, store) => action$
    .ofType(Description_Actions.ActionTypes.SAVE_Description_STATE).pipe(
      switchMap(a => this.searchInfoService.saveDescription(a.payload).pipe(
        map(data => this.actions.saveDescriptionSucceeded(data)),
        catchError(response => of(this.actions.saveDescriptionFailed({
          status: response.status,
          message: response.message
        }))),
        startWith(this.actions.saveDescriptionStarted())))
    );

  public deleteDescription_EPIC: Epic<FSAction, FSAction, IAppState, any> = (action$, store) => action$
    .ofType(Description_Actions.ActionTypes.DELETE_Description_STATE).pipe(
      switchMap(a => this.searchInfoService.deleteDescription(a.payload).pipe(
        map(data => this.actions.deleteDescriptionSucceeded(data)),
        catchError(response => of(this.actions.deleteDescriptionFailed({
          status: response.status,
          message: response.message
        }))),
        startWith(this.actions.deleteDescriptionStarted()))
      ));


  public likeDescription_EPIC: Epic<FSAction, FSAction, IAppState, any> = (action$, store) => action$
    .ofType(Description_Actions.ActionTypes.LIKE_Description_STATE).pipe(
      switchMap(a => this.searchInfoService.likeDescription(a.payload).pipe(
        map(data => this.actions.likeDescriptionSucceeded(data)),
        catchError(response => of(this.actions.likeDescriptionFailed({
          status: response.status,
          message: response.message
        }))),
        startWith(this.actions.likeDescriptionStarted())))
    );

  public commentDescription_EPIC: Epic<FSAction, FSAction, IAppState, any> = (action$, store) => action$
    .ofType(Description_Actions.ActionTypes.COMMENT_Description_STATE).pipe(
      switchMap(a => this.searchInfoService.commentDescription(a.payload).pipe(
        map(data => this.actions.likeDescriptionSucceeded(data)),
        catchError(response => of(this.actions.likeDescriptionFailed({
          status: response.status,
          message: response.message
        }))),
        startWith(this.actions.likeDescriptionStarted())))
    );

  public getRootEpic(): Epic<Action, Action, any, any>[] {
    return [
      this.getDescription_EPIC,
      this.deleteDescription_EPIC,
      this.saveDescription_EPIC,
      this.likeDescription_EPIC,
      this.commentDescription_EPIC
    ];
  }
}
