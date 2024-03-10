/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImportBoxTemp2Component } from './import-box-temp2.component';

describe('ImportBoxTemp2Component', () => {
  let component: ImportBoxTemp2Component;
  let fixture: ComponentFixture<ImportBoxTemp2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBoxTemp2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBoxTemp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
