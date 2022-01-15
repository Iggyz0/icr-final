import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExhibitDialogComponent } from './add-exhibit-dialog.component';

describe('AddExhibitDialogComponent', () => {
  let component: AddExhibitDialogComponent;
  let fixture: ComponentFixture<AddExhibitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExhibitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExhibitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
