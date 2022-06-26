import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalGroupComponent } from './regional-group.component';

describe('RegionalGroupComponent', () => {
  let component: RegionalGroupComponent;
  let fixture: ComponentFixture<RegionalGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
