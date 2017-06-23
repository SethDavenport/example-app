import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

const ITERATIONS = 10000;

@Component({
  selector: 'zoo-root',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Welcome to the Zoo';

  leakTest: Observable<any>[] = [];
  subscriptions: Subscription[] = [];

  constructor(private ngRedux: NgRedux<any>) {}

  testForLeaks() {
    console.log('Allocating', ITERATIONS, 'subscriptions');
    for (let i=0; i<ITERATIONS; ++i) {
      let selection = this.ngRedux.select('whatever');
      this.leakTest.push(selection);
      this.subscriptions.push(selection.subscribe(() => null));
    }
    console.log('Done allocating', ITERATIONS, 'subscriptions');
  }

  cleanUp() {
    console.log('Unsubscribing', this.subscriptions.length, 'subscriptions');
    this.subscriptions.map(s => s.unsubscribe);
    console.log('Done unsubscribing', this.subscriptions.length, 'subscriptions');
  }
}
