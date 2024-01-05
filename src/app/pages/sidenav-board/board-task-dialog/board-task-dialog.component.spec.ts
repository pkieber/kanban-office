import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskDialogComponent } from './board-task-dialog.component';

describe('BoardTaskDialogComponent', () => {
  let component: BoardTaskDialogComponent;
  let fixture: ComponentFixture<BoardTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTaskDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
