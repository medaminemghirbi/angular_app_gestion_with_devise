import { TestBed } from '@angular/core/testing';

import { DemandesServicesService } from './demandes-services.service';

describe('DemandesServicesService', () => {
  let service: DemandesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
