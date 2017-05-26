import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  NgRedux,
  dispatch,
  select,
  select$,
  ObservableStore,
  Transformer, //Wat did I not export this type?
  FunctionSelector,
  Fractal,
} from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { IAppState } from '../../store/model';
import { animalComponentReducer } from './reducers';

export const selectSubTotal = state =>
  (state.ticketPrice || 0) * (state.numTickets || 0);
export const defaultToZero: Transformer<number, number> = obs$ =>
  obs$.map(n => n || 0);

/**
 * Fractal component example.
 */
@FractalStore({
  basePath: 'basePath', // Reference to method to be called after ngOnInit
  localReducer: animalComponentReducer,
})
@Component({
  selector: 'zoo-animal',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalComponent {
  static readonly ADD_TICKET = 'ADD_TICKET';
  static readonly REMOVE_TICKET = 'REMOVE_TICKET';

  basePath = () => [this.animalType, 'items', this.key];

  @Input() key: string;
  @Input() animalType: string;

  // Change implementation of dispatch - if this is a fractalStore
  // class, get use a subStore instance instead of ngRedux.
  @dispatch() addTicket = () => ({ type: 'ADD_TICKET' });
  @dispatch() removeTicket = () => ({ type: 'REMOVE_TICKET' });

  @select(selectSubTotal) subTotal$: Observable<number>;
  @select() name$: Observable<string>;

  @select$('tickets', defaultToZero)
  numTickets$: Observable<number>;

  @select$('ticketPrice', defaultToZero)
  ticketPrice$: Observable<number>;
}
