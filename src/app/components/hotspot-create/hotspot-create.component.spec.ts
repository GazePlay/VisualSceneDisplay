import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotCreateComponent} from './hotspot-create.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';

describe('HotspotCreateComponent', () => {
  let component: HotspotCreateComponent;
  let fixture: ComponentFixture<HotspotCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotspotCreateComponent],
      imports: [MatDialogModule, TranslateModule.forRoot()],
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
    fixture = TestBed.createComponent(HotspotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
