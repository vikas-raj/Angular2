import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware, combineEpics } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';
import { Description_Actions } from './description.action';
import { Router } from '@angular/router';
import { IAppState, FSAction } from '../store.model';
import { SearchInfoService } from '../../components/shared/services/search.service';

//type Predicate = (any) => boolean;

@Injectable()
export class Description_Epics {
    constructor(private searchInfoService: SearchInfoService, private _router: Router, private actions: Description_Actions) { }

    public getDescription_EPIC(): Epic<FSAction, IAppState> {
        return (action$, store) => action$
            .ofType(Description_Actions.ActionTypes.GET_Description_STATE)
            .switchMap(a => this.searchInfoService.getDescriptionById(a.payload)
                .map(data => this.actions.getDescriptionSucceeded(data))
                .catch(response => of(this.actions.getDescriptionFailed({
                    status: response.status,
                    message: response.message
                })))
                .startWith(this.actions.getDescriptionStarted())
            );
    }

    public saveDescription_EPIC(): Epic<FSAction, IAppState> {
        return (action$, store) => action$
            .ofType(Description_Actions.ActionTypes.SAVE_Description_STATE)
            .switchMap(a => this.searchInfoService.saveDescription(a.payload)
                .map(data => this.actions.saveDescriptionSucceeded(data))
                .catch(response => of(this.actions.saveDescriptionFailed({
                    status: response.status,
                    message: response.message
                })))
                .startWith(this.actions.saveDescriptionStarted())
            );
    }

    public deleteDescription_EPIC(): Epic<FSAction, IAppState> {
        return (action$, store) => action$
            .ofType(Description_Actions.ActionTypes.DELETE_Description_STATE)
            .switchMap(a => this.searchInfoService.deleteDescription(a.payload)
                .map(data => this.actions.deleteDescriptionSucceeded(data))
                .catch(response => of(this.actions.deleteDescriptionFailed({
                    status: response.status,
                    message: response.message
                })))
                .startWith(this.actions.deleteDescriptionStarted())
            );
    } 

    getRootEpic = () => combineEpics(
        this.getDescription_EPIC(),
        this.deleteDescription_EPIC(),
        this.saveDescription_EPIC()
    );
}