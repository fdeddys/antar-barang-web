import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTransaksiComponent } from './report-transaksi.component';

describe('ReportTransaksiComponent', () => {
  let component: ReportTransaksiComponent;
  let fixture: ComponentFixture<ReportTransaksiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTransaksiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
