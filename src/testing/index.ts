import { NgModule, ClassProvider } from '@angular/core';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { MockNgRedux } from './ng-redux.mock';
import { MockDevToolsExtension } from './dev-tools.mock';

export { MockNgRedux };

// Needs to be initialized early so @select's use the mocked version too.
const mockNgRedux = new MockNgRedux();

@NgModule({
  imports: [],
  providers: [
    { provide: NgRedux, useValue: mockNgRedux },
    { provide: DevToolsExtension, useClass: MockDevToolsExtension },
  ],
})
export class NgReduxTestingModule {}
