import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaksiModalComponent } from './transaksi-modal.component';

describe('TransaksiModalComponent', () => {
  let component: TransaksiModalComponent;
  let fixture: ComponentFixture<TransaksiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaksiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaksiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
