import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteConfirmComponent } from './dialog-delete-confirm.component';

describe('DialogDeleteConfirmComponent', () => {
  let component: DialogDeleteConfirmComponent;
  let fixture: ComponentFixture<DialogDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
