/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntermediateCoalStorageFacilitiesComponent } from './intermediate-coal-storage-facilities.component';

describe('IntermediateCoalStorageFacilitiesComponent', () => {
  let component: IntermediateCoalStorageFacilitiesComponent;
  let fixture: ComponentFixture<IntermediateCoalStorageFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediateCoalStorageFacilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateCoalStorageFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
