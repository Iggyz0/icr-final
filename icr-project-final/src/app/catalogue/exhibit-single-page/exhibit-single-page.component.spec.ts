import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitSinglePageComponent } from './exhibit-single-page.component';

describe('ExhibitSinglePageComponent', () => {
  let component: ExhibitSinglePageComponent;
  let fixture: ComponentFixture<ExhibitSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitSinglePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
