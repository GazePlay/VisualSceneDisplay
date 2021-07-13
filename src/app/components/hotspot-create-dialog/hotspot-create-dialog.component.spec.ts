import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotCreateDialogComponent} from './hotspot-create-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

describe('HotspotCreateDialogComponent', () => {
  let component: HotspotCreateDialogComponent;
  let fixture: ComponentFixture<HotspotCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotspotCreateDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
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
    fixture = TestBed.createComponent(HotspotCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
