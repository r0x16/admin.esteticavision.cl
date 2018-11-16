import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDangerComponent } from './product-danger.component';

describe('ProductDangerComponent', () => {
  let component: ProductDangerComponent;
  let fixture: ComponentFixture<ProductDangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
