
import { Injectable } from '@angular/core';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import { Action } from 'redux';
import { Description_Epics } from './description/description.epics';

@Injectable()
export class RootEpics {
  constructor(private description_Epics: Description_Epics) { }

  public createEpics(): Epic<Action, Action, any, any>[] {
    return this.description_Epics.getRootEpic()
    //.concate(this.animalEpics.createEpic(ANIMAL_TYPES.LION),
    // this.general.createEpic(ANIMAL_TYPES.LION))
  }
}
