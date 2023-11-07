import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavBoardComponent } from './sidenav-board.component';

describe('SidenavBoardComponent', () => {
  let component: SidenavBoardComponent;
  let fixture: ComponentFixture<SidenavBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
