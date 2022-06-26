import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalGroupModalComponent } from './regional-group-modal.component';

describe('RegionalGroupModalComponent', () => {
  let component: RegionalGroupModalComponent;
  let fixture: ComponentFixture<RegionalGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
