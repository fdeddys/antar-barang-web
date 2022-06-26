import { TestBed } from '@angular/core/testing';

import { RegionalGroupService } from './regional-group.service';

describe('RegionalGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionalGroupService = TestBed.get(RegionalGroupService);
    expect(service).toBeTruthy();
  });
});
