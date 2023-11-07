import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAddtaskComponent } from './sidenav-addtask.component';

describe('SidenavAddtaskComponent', () => {
  let component: SidenavAddtaskComponent;
  let fixture: ComponentFixture<SidenavAddtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavAddtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavAddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
