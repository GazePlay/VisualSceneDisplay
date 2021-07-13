import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RenameDialogComponent} from './rename-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';

describe('RenameDialogComponent', () => {
  let component: RenameDialogComponent;
  let fixture: ComponentFixture<RenameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RenameDialogComponent]
      ,
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
