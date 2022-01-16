import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitCreationComponent } from './exhibit-creation.component';

describe('ExhibitCreationComponent', () => {
  let component: ExhibitCreationComponent;
  let fixture: ComponentFixture<ExhibitCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
