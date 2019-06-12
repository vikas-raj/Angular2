
import { Injectable } from '@angular/core';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { Action } from 'redux';
import { Description_Epics } from './description/description.epics';
import { App_Epics } from './app/app.epics';

@Injectable()
export class RootEpics {
  constructor(private description_Epics: Description_Epics, private app_Epics: App_Epics) { }

  public createEpics(): Epic<Action, Action, any, any>[] {
    return this.description_Epics.getRootEpic()
      .concat(this.app_Epics.getRootEpic(),
        //this.user.getRootEpic()
      )
    // this.general.createEpic(ANIMAL_TYPES.LION))
  }
}
