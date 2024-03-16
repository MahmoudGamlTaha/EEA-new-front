/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompaniesUsingCoalAsAnInputComponent } from './companies-using-coal-as-an-input.component';

describe('CompaniesUsingCoalAsAnInputComponent', () => {
  let component: CompaniesUsingCoalAsAnInputComponent;
  let fixture: ComponentFixture<CompaniesUsingCoalAsAnInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesUsingCoalAsAnInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesUsingCoalAsAnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
