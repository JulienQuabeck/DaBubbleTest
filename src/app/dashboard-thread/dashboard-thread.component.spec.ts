import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardThreadComponent } from './dashboard-thread.component';

describe('DashboardThreadComponent', () => {
  let component: DashboardThreadComponent;
  let fixture: ComponentFixture<DashboardThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardThreadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
