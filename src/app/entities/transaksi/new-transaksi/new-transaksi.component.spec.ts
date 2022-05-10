import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransaksiComponent } from './new-transaksi.component';

describe('NewTransaksiComponent', () => {
  let component: NewTransaksiComponent;
  let fixture: ComponentFixture<NewTransaksiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTransaksiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
