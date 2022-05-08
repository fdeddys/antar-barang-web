import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerModalComponent } from './seller-modal.component';

describe('SellerModalComponent', () => {
  let component: SellerModalComponent;
  let fixture: ComponentFixture<SellerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
