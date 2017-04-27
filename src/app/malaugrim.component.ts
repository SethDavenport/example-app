import { Component, OnDestroy, Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

interface Order {}
interface Project {}

@Injectable()
export class OrderActions {
  constructor(private ngRedux: NgRedux<any>) {}

  goToNextStep(order: Order) {
    this.ngRedux.dispatch({ type: 'NEXT' });
  }
}

export function getCurrentProject(order: Order) {
  return {};
}

@Component({
	selector: 'summary-component',
	//templateUrl: 'summary.template.html',
  template: '<p>Whatever</p>'
})
export class SummaryComponent implements OnDestroy {
	@select('order')
	private order$: Observable<Order>;

	@select(state => getCurrentProject(state.order))
	private currentProject$: Observable<Project>;

	private order: Order;
	private subscription: Subscription;

	constructor(private actions: OrderActions) {
		this.subscription = this.order$.subscribe(order => this.order = order);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	navigateToAuditTeam() {
		this.actions.goToNextStep(this.order);
	}
}
