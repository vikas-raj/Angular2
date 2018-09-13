
import { Injectable } from '@angular/core';
import { combineEpics, createEpicMiddleware } from 'redux-observable';


import { Description_Epics } from './description/description.epics';

@Injectable()
export class RootEpics {
    constructor(private description_Epics: Description_Epics) {}

  public createEpics() {
    return [
        createEpicMiddleware(this.description_Epics.getRootEpic())              
      //this.animalEpics.createEpic(ANIMAL_TYPES.LION),
    ];
  }
}
