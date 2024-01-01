import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMobilenavComponent } from './custom-mobilenav.component';

describe('CustomMobilenavComponent', () => {
  let component: CustomMobilenavComponent;
  let fixture: ComponentFixture<CustomMobilenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMobilenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomMobilenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
