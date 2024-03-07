import { AdmissionFormMappingService } from './../../services/admission-form/admission-form-mapping.service';
import { AdmissionFormApiService } from './../../services/admission-form/admission-form-api.service';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionFormComponent } from '@operations/pages/admission-form/admission-form.component';
import { DigitalSealingSubmitionComponent } from '@operations/pages/digital-sealing-submition/digital-sealing-submition.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { RdfFormComponent } from '../rdf-form/rdf-form.component';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';

@Component({
  selector: 'app-submit-admission-stepper',
  standalone: true,
  imports: [
    CommonModule,
    AdmissionFormComponent,
    DigitalSealingSubmitionComponent,
    MatStepperModule,
    TranslateModule,
    RdfFormComponent,
  ],
  templateUrl: './submit-admission-stepper.component.html',
  styleUrl: './submit-admission-stepper.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class SubmitAdmissionStepperComponent implements OnInit {
  @ViewChild('admissionForm') admissionForm: AdmissionFormComponent;
  @ViewChild('rdfForm') rdfForm: RdfFormComponent;
  selectedCompanyId;
  selectedCompanySubscription$: Subscription;
  isCementCompany = false;
  requestId;
  nextSubscription:Subscription;
  countSteps = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private admissionFormService: AdmissionFormService,
    private admissionFormApiService: AdmissionFormApiService,
    private admissionFormMappingService:AdmissionFormMappingService
  ) {}

  ngOnInit(): void {
    this.selectedCompanySubscription$ =
      this.admissionFormApiService.selectedCompany.subscribe((res) => {
        
        this.selectedCompanyId = res;
      });
  }
  scroll() {
    window.scroll(0, 0);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      panelClass: 'custom-container',
      data: {
        row: 'row',
        option: 'digitalSealingSuccess',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/operations/statistics']);
    });
  }

  onSubmitAdmissionFormData(stepper: MatStepper) {
    this.scroll();
    this.admissionForm.onSubmit();
    this.nextSubscription = this.admissionFormService.nextPage.subscribe((res) => {
      if (res) {
        
        let selectedCompany = this.admissionForm.ownerCompaniesArr.filter(
          (company) => {
            return company.id == this.selectedCompanyId;
          }
        )[0];
        //check if the company is a cement company
        console.log(selectedCompany?.activity.code);
        if (selectedCompany?.activity.code === 'RDF-Cement') {
          this.isCementCompany = true;
        }
        this.requestId = res.requestId;
        if (res.nextPage) {
          stepper.next();
          this.countSteps+=1;
          console.log('step counter from stepper form' , this.countSteps)
          this.nextSubscription.unsubscribe();
          
          console.log(stepper)
          this.admissionFormService.nextPage.next({nextPage: false ,requestId: null})
        }
      }
    });
  }
  backToAdmissionForm(){
    this.scroll();
    this.admissionFormMappingService.count.next(0);
    this.admissionFormMappingService.attachmentArrForApi.next([]);
    this.admissionFormMappingService.invoiceForApi.next(null);
    this.admissionFormMappingService.requestDetailForApi.next([])
    this.admissionFormService.nextPage.next({
      nextPage: false,
      requestId: null,
    });
  }
  onSubmitRdfFormData(stepper: MatStepper) {
    this.scroll();
    this.rdfForm.onSubmit();
    stepper.next();
  }
}
