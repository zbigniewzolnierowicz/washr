import { TestBed } from '@angular/core/testing';

import { ZoomedImageService } from './zoomed-image.service';

describe('ZoomedImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZoomedImageService = TestBed.get(ZoomedImageService);
    expect(service).toBeTruthy();
  });
});
