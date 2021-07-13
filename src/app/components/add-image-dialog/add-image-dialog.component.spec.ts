import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AddImageDialogComponent} from './add-image-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';

describe('AddImageDialogComponent', () => {
  let component: AddImageDialogComponent;
  let fixture: ComponentFixture<AddImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddImageDialogComponent],
      imports: [MatDialogModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule, TranslateModule.forRoot()],
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
    fixture = TestBed.createComponent(AddImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
