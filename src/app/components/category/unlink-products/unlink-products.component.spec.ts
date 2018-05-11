import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlinkProductsComponent } from './unlink-products.component';

describe('UnlinkProductsComponent', () => {
  let component: UnlinkProductsComponent;
  let fixture: ComponentFixture<UnlinkProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlinkProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlinkProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
