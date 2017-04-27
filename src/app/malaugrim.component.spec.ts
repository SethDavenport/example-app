import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';
import { SummaryComponent, OrderActions } from './malaugrim.component';

describe('malaugrim', () => {

	let fixture: ComponentFixture<SummaryComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NgReduxTestingModule/*, AccordionModule, SharedModule*/],
			declarations: [SummaryComponent/*, OrderDataComponent, OrderLocationsComponent, AuditTypesListingComponent*/],
      providers: [OrderActions],
		}).compileComponents();

		MockNgRedux.reset();
	});

	fit('should pass', () => {
		fixture = TestBed.createComponent(SummaryComponent);
	})
});
