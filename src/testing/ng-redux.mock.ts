import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

// TODO roll this into lib.
// TODO: strongly type it, document it, provide its own interface
// as a subtype of NgRedux.
// Harmonize naming conventions with mock HTTP stuff.

export class MockNgRedux extends NgRedux<any> {
  private static mockInstance: MockNgRedux;
  private static selections: Object;

  static spyOnDispatch(): jasmine.Spy {
    return spyOn(MockNgRedux.mockInstance, 'dispatch');
  }

  static spyOnSelect(): jasmine.Spy {
    return spyOn(MockNgRedux.mockInstance, 'select');
  }

  static registerSelection(selector, values) {
    MockNgRedux.selections[selector] = values;
  }

  static reset() {
    MockNgRedux.selections = {};
  }

  constructor() {
    super(null);

    // Also mock the static instance used by @select.
    NgRedux.instance = this;

    MockNgRedux.mockInstance = this;
    MockNgRedux.selections = {};
  }

  dispatch = () => null;

  select(selector) {
    return Observable.from(MockNgRedux.selections[selector] || []);
  }
}
