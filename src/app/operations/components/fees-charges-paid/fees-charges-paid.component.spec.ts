/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeesChargesPaidComponent } from './fees-charges-paid.component';

describe('FeesChargesPaidComponent', () => {
  let component: FeesChargesPaidComponent;
  let fixture: ComponentFixture<FeesChargesPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesChargesPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesChargesPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
