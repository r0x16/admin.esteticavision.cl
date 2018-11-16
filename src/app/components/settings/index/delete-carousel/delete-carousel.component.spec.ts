import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarouselComponent } from './delete-carousel.component';

describe('DeleteCarouselComponent', () => {
  let component: DeleteCarouselComponent;
  let fixture: ComponentFixture<DeleteCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
