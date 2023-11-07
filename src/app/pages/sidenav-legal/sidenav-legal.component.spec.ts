import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLegalComponent } from './sidenav-legal.component';

describe('SidenavLegalComponent', () => {
  let component: SidenavLegalComponent;
  let fixture: ComponentFixture<SidenavLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavLegalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
