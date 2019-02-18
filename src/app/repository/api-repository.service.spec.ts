import { TestBed, inject } from '@angular/core/testing';

import { ApiRepositoryService } from './api-repository.service';

describe('ApiRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRepositoryService]
    });
  });

  it('should be created', inject([ApiRepositoryService], (service: ApiRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
