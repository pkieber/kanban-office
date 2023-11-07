import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSummaryComponent } from './sidenav-summary.component';

describe('SidenavSummaryComponent', () => {
  let component: SidenavSummaryComponent;
  let fixture: ComponentFixture<SidenavSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
