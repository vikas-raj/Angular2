import { NgModule } from '@angular/core';

// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';

// Redux ecosystem stuff.
import  { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// The top-level reducers and epics that make up our app's logic.
import { IAppState, INITIAL_STATE } from './store.model';
import { rootReducer } from './store.reducers';
import { RootEpics } from './store.epics';

import { Description_Actions } from './description/description.action';
import { Description_Epics } from './description/description.epics';


//import { createLogger } from 'redux-logger';
@NgModule({
  imports: [NgReduxModule, NgReduxRouterModule.forRoot()],
  providers: [RootEpics, Description_Actions, Description_Epics],
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpics,
  ) {

    var middleWare = createEpicMiddleware();
    //if (process.env.NODE_ENV !== 'production' && typeof (window) !== 'undefined') {
    //    //NODE_ENV will be equal to 'production' when published which happens in Devintegration,uat, production. 
    //    //To get some performance benifit during server side rendering. Refer https://github.com/evgenyrodionov/redux-logger/issues/6 bcz Only the client has a window object, so only put the logger if the window is set
    //    //middleWare = [createLogger(), ...middleWare]
    //    middleWare = [createLogger(), ...middleWare]
    //}

    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    store.configureStore(
      rootReducer,
      INITIAL_STATE,
      [createLogger(), middleWare],
      devTools.isEnabled() ? [devTools.enhancer()] : []);

    for (const epic of rootEpics.createEpics()) {
      middleWare.run(epic);
    }
    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }

    // Enable syncing of Angular form state with our Redux store.
    provideReduxForms(store);
  }
}
