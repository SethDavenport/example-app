import { TestBed, async } from '@angular/core/testing';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

import { Component, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toarray';
import 'rxjs/add/operator/do';

import { LionPageComponent } from './lion-page.container';
import { AnimalActions } from '../animals/animal.actions';
import { ANIMAL_TYPES } from '../animals/animal.types';

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
    const expectedSequence = [
      [ { name: 'I am a Lion!' } ],
      [ { name: 'I am a Lion!' }, { name: 'I am a second Lion!' } ]
    ];

    const lionItemsStub = MockNgRedux.getSelectorStub(['lions', 'items']);
    expectedSequence.forEach(value => lionItemsStub.next(value));
    lionItemsStub.complete();

    lionPage.animals$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual(expectedSequence),
        null,
        done);
  });

  it('should know when the animals are loading', done => {
    const fixture = TestBed.createComponent(LionPageComponent);
    const lionPage = fixture.debugElement.componentInstance;

    const lionsLoadingStub = MockNgRedux.getSelectorStub(['lions', 'loading']);
    lionsLoadingStub.next(false);
    lionsLoadingStub.next(true);
    lionsLoadingStub.complete();

    lionPage.loading$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual([ false, true ]),
        null,
        done);
  });

  it('should know when there\'s an error', done => {
    const fixture = TestBed.createComponent(LionPageComponent);
    const lionPage = fixture.debugElement.componentInstance;
    const expectedSequence = [ true ];

    const lionsErrorStub = MockNgRedux.getSelectorStub(['lions', 'error']);
    lionsErrorStub.next(false);
    lionsErrorStub.next(true);
    lionsErrorStub.complete();

    lionPage.error$
      .toArray()
      .subscribe(
        actualSequence => expect(actualSequence).toEqual([ false, true ]),
        null,
        done);
  });

  it('should load lions on creation', () => {
    const spy = spyOn(MockNgRedux.mockInstance, 'dispatch');
    const fixture = TestBed.createComponent(LionPageComponent);

    expect(spy).toHaveBeenCalledWith({
      type: AnimalActions.LOAD_STARTED,
      meta: { animalType: ANIMAL_TYPES.LION },
    });
  });
});
