import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalModalComponent } from './regional-modal.component';

describe('RegionalModalComponent', () => {
  let component: RegionalModalComponent;
  let fixture: ComponentFixture<RegionalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
