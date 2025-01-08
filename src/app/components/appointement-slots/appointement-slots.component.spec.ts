import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointementSlotsComponent } from './appointement-slots.component';

describe('AppointementSlotsComponent', () => {
  let component: AppointementSlotsComponent;
  let fixture: ComponentFixture<AppointementSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointementSlotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointementSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
