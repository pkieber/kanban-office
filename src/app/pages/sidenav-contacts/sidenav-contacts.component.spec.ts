import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContactsComponent } from './sidenav-contacts.component';

describe('SidenavContactsComponent', () => {
  let component: SidenavContactsComponent;
  let fixture: ComponentFixture<SidenavContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
