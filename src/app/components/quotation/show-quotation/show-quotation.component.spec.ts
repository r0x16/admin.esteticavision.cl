import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuotationComponent } from './show-quotation.component';

describe('ShowQuotationComponent', () => {
  let component: ShowQuotationComponent;
  let fixture: ComponentFixture<ShowQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
