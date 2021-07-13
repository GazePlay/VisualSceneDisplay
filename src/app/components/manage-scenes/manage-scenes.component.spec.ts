import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ManageScenesComponent} from './manage-scenes.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';

describe('ManageScenesComponent', () => {
  let component: ManageScenesComponent;
  let fixture: ComponentFixture<ManageScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageScenesComponent],
      imports: [MatDialogModule, TranslateModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
