import { TestBed } from '@angular/core/testing';

import { ForceCookiesService } from './force-cookies.service';

describe('ForceCookiesService', () => {
  let service: ForceCookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForceCookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
