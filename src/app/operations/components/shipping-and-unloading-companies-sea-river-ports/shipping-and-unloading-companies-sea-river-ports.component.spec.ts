/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShippingAndUnloadingCompaniesSeaRiverPortsComponent } from './shipping-and-unloading-companies-sea-river-ports.component';

describe('ShippingAndUnloadingCompaniesSeaRiverPortsComponent', () => {
  let component: ShippingAndUnloadingCompaniesSeaRiverPortsComponent;
  let fixture: ComponentFixture<ShippingAndUnloadingCompaniesSeaRiverPortsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAndUnloadingCompaniesSeaRiverPortsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAndUnloadingCompaniesSeaRiverPortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
