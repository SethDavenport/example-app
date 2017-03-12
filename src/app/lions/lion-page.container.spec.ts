import { TestBed, async } from '@angular/core/testing';
import { LionPageComponent } from './lion-page.container';
import { NgRedux } from '@angular-redux/store';

import { NgReduxTestingModule, MockNgRedux } from '../../testing';

import { AnimalActions } from '../animals/animal.actions';
import { ANIMAL_TYPES } from '../animals/animal.types';

// TODO: mocking dependent components: good idea? Is there a
// better way?
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

@Component({
  selector: 'zoo-animal-list',
  template: 'Mock Animal List',
})
class MockAnimalListComponent {
  @Input() animalsName: string;
  @Input() animals: Observable<any>;
  @Input() loading: Observable<boolean>;
  @Input() error: Observable<any>;
};

describe('Lion Page Container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LionPageComponent, MockAnimalListComponent],
      imports: [NgReduxTestingModule],
      providers: [AnimalActions],
    }).compileComponents();

    MockNgRedux.reset();
  });

  it('should select some lions from the Redux store', done => {
    const fixture = TestBed.createComponent(LionPageComponent);
    const lionPage = fixture.debugElement.componentInstance;

    MockNgRedux.registerSelection(['lions', 'items'], [
      [ { name: 'I am a Lion!' } ],
      [ { name: 'I am a Lion!' }, { name: 'I am a second Lion!' } ]
    ]);

    // TODO: is there a better way to expect on an observable sequence of
    // values?

    lionPage.animals$.subscribe(
      v => console.log('V', v), // Will be an expectation
      null,
      done);
  });

  it('should load lions on creation', () => {
    const spy = MockNgRedux.spyOnDispatch();
    const fixture = TestBed.createComponent(LionPageComponent);

    expect(spy).toHaveBeenCalledWith({
      type: AnimalActions.LOAD_STARTED,
      meta: { animalType: ANIMAL_TYPES.LION },
    });
  });
});
