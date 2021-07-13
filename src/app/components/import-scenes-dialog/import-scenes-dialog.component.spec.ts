import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportScenesDialogComponent} from './import-scenes-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';

describe('ImportScenesDialogComponent', () => {
  let component: ImportScenesDialogComponent;
  let fixture: ComponentFixture<ImportScenesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportScenesDialogComponent],
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
    fixture = TestBed.createComponent(ImportScenesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
