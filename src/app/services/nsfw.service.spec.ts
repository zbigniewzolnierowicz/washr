import { TestBed } from '@angular/core/testing';

import { NsfwService } from './nsfw.service';

describe('NsfwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NsfwService = TestBed.get(NsfwService);
    expect(service).toBeTruthy();
  });
});
