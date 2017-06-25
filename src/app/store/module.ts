import { NgModule } from '@angular/core';

// Angular-redux ecosystem stuff.
// @angular-redux/form and @angular-redux/router are optional
// extensions that sync form and route location state between
// our store and Angular.
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';

// Redux ecosystem stuff.
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

// The top-level reducers and epics that make up our app's logic.
import { IAppState } from './model';
import { rootReducer } from './reducers';
import { RootEpics } from './epics';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [NgReduxModule, NgReduxRouterModule],
  providers: [RootEpics],
})
export class StoreModule {
  static initialState: IAppState = {};

  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpics,
  ) {
    console.log('COnfiguring the store');

    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    store.configureStore(
      rootReducer,
      StoreModule.initialState,
      [ createLogger(), ...rootEpics.createEpics() ],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);

    // Enable syncing of Angular router state with our Redux store.
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }

    //   Enable syncing of Angular form state with our Redux store.
    provideReduxForms(store);

    // Don't lose store contents during HMR.
    // Move this to appModule instead?
    if (environment.hmr) {
      if (module['hot']) {
        module['hot'].dispose((): void => {
          StoreModule.initialState = store.getState();
          console.log('DISPOSE', store.getState());
        });
      }
    }
  }
}
