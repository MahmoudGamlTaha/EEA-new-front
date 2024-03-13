/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LandTransportationCompaniesCoalAndPetroleumComponent } from './Land-transportation-companies-coal-and-petroleum.component';

describe('LandTransportationCompaniesCoalAndPetroleumComponent', () => {
  let component: LandTransportationCompaniesCoalAndPetroleumComponent;
  let fixture: ComponentFixture<LandTransportationCompaniesCoalAndPetroleumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandTransportationCompaniesCoalAndPetroleumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandTransportationCompaniesCoalAndPetroleumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
