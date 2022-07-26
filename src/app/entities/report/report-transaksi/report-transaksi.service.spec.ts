import { TestBed } from '@angular/core/testing';

import { ReportTransaksiService } from './report-transaksi.service';

describe('ReportTransaksiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportTransaksiService = TestBed.get(ReportTransaksiService);
    expect(service).toBeTruthy();
  });
});
