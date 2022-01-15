import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToTourComponent } from './add-to-tour.component';

describe('AddToTourComponent', () => {
  let component: AddToTourComponent;
  let fixture: ComponentFixture<AddToTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
