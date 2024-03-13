/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImportBoxTemp1Component } from './import-box-temp1.component';

describe('ImportBoxTemp1Component', () => {
  let component: ImportBoxTemp1Component;
  let fixture: ComponentFixture<ImportBoxTemp1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBoxTemp1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBoxTemp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
