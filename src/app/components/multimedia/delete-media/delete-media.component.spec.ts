import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMediaComponent } from './delete-media.component';

describe('DeleteMediaComponent', () => {
  let component: DeleteMediaComponent;
  let fixture: ComponentFixture<DeleteMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
