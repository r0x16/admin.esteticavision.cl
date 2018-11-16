import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDetailComponent } from './delete-detail.component';

describe('DeleteDetailComponent', () => {
  let component: DeleteDetailComponent;
  let fixture: ComponentFixture<DeleteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
