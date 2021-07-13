import {TestBed} from '@angular/core/testing';

import {SceneDisplayService} from './scene-display.service';
import {TranslateModule} from '@ngx-translate/core';

describe('SceneDisplayService', () => {
  let service: SceneDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.inject(SceneDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
