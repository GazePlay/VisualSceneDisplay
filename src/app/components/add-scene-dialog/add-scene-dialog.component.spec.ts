import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddSceneDialogComponent} from './add-scene-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

describe('AddSceneDialogComponent', () => {
  let component: AddSceneDialogComponent;
  let fixture: ComponentFixture<AddSceneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSceneDialogComponent],
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
    fixture = TestBed.createComponent(AddSceneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
