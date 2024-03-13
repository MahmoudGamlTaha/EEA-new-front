import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasportCompaniesComponent } from './trasport-companies.component';

describe('TrasportCompaniesComponent', () => {
  let component: TrasportCompaniesComponent;
  let fixture: ComponentFixture<TrasportCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrasportCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrasportCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
