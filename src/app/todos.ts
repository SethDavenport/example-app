import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NgRedux } from '@angular-redux/store';

import { Epic, createEpicMiddleware } from 'redux-observable';
import { Action, Store } from 'redux';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Probably you already have this defined somewhere else.
interface ITodo {
  // Whatever your todo type looks like.
}

// Probably you already have this defined somewhere else.
interface IAppState {
  todos?: ITodo[];



@Injectable()
export class TodosEpics {
  constructor(private http: Http) {}

  // An Epic listens to your action stream after all the reducers have been
  // applied; it uses RxJS operators to transform that stream into another
  // observable of actions.
  private loadTodosEpic = (action$, store) =>
    // In this case GET_TODOS has been triggered by a very simple action creator.
    action$.ofType(GET_TODOS)
      // Ignore GET_TODOS actions any time there are already TODOs in the state.
      .filter(() => store.getState().todos && store.getState.todos.length)
      // If we don't already have todos, it's time to combine this stream with
      // the observable coming back from http.get()
      .switchMap(a => this.http.get(...)
        // It worked, fire an action that will cause the reducers to put the
        // retrieved todos back in the store.
        .map(data => ({ type: GET_TODOS_SUCCESS, payload: data }))
        // It didn't work. Fire an action so save error info.
        .catch(response => ({ type: GET_TODOS_FAILED, error: response.error })))

  // This gets registered with redux.
  public readonly todoLoaderMiddleware = createEpicMiddleware(this.loadTodosEpic);

}