import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChannelsComponent } from './dashboard-channels.component';

describe('DashboardChannelsComponent', () => {
  let component: DashboardChannelsComponent;
  let fixture: ComponentFixture<DashboardChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChannelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
