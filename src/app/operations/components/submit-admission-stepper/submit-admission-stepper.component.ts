import { AdmissionFormMappingService } from './../../services/admission-form/admission-form-mapping.service';
import { AdmissionFormApiService } from './../../services/admission-form/admission-form-api.service';
import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { FeesAndExpensesService } from '@operations/services/fees-and-expenses.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';

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
export class SubmitAdmissionStepperComponent implements OnInit, OnChanges {
  @ViewChild('admissionForm') admissionForm: AdmissionFormComponent;
  @ViewChild('rdfForm') rdfForm: RdfFormComponent;
  selectedCompanyId;
  selectedCompanySubscription$: Subscription;
  isCementCompany = false;
  requestId;
  nextSubscription:Subscription;
  countSteps = 0;
  formType;
  requestStatus;
  userCompanies;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private admissionFormService: AdmissionFormService,
    private admissionFormApiService: AdmissionFormApiService,
    private admissionFormMappingService:AdmissionFormMappingService,
    private cdRef: ChangeDetectorRef,
    private feeService:FeesAndExpensesService,
    private requestCoreService:RequestCoreService
  ) {}

  ngOnInit(): void {
    this.selectedCompanySubscription$ =
      this.admissionFormApiService.selectedCompany.subscribe((res) => {
        console.log(res);
        this.selectedCompanyId = res;
      });
      this.requestCoreService.getOwnerCompanies().subscribe(res=>{
        this.userCompanies = res.content;
        console.log(res.content)
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
   /* this.admissionFormApiService.selectedCompany.subscribe((res) => {
      console.log(res);
      this.selectedCompanyId = res;
    });*/
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
    stepper.reset();
    this.isCementCompany = false;
    this.scroll();
   let companies = this.admissionForm.companies;
    this.requestStatus = this.admissionForm.customerRequestData?.status;
    this.admissionForm.onSubmit();
    this.requestId = this.admissionForm.requestId
    this.formType = this.admissionForm.formType;
   
    console.log(this.admissionForm.currentCompany);
    if(companies == undefined || companies == null){
     
      companies = this.userCompanies;
    }
   
  //  this.nextSubscription = this.admissionFormService.nextPage.subscribe((res) => {
      //console.log(res);
    //  if (res.nextPage) {
      let selectedCompany = this.admissionForm?.currentCompany[0];
     console.log(selectedCompany);
      //check if the company is a cement company
    
      if (selectedCompany?.activity.code === 'RDF-Cement') {
         alert("zeft");
        this.isCementCompany = true;
      }
      //this.requestId = res.requestId;
    //  stepper.next();
    this.cdRef.detectChanges();
    console.log(this.formType)
   
    this.requestCoreService.setCurrentCustomerRequestId(this.requestId);
    //if(!(this.formType == 'add')){
     // stepper.next();
   // }
     if(this.formType == 'view-only'){ // useless code may be removed 
      this.feeService.setCustomerRequest(this.admissionForm.customerRequestData);
      console.log(this.feeService.customerRequest);
      stepper.next();
      //this.router.navigateByUrl('operations/feesAndExpenses/'+ this.requestId);
      
    }else if(this.formType =='check'){
      stepper.next();
    }
    else if((this.formType == 'add')) { // there is some logic should be added
      //this.admissionFormService.nextPage.subscribe(res =>{
      //   if(res.nextPage){
        //   this.requestCoreService.setCurrentCustomerRequestId(res.requestId);
             stepper.next();
        //  }
    //  })
      
    }
    }
   // console.log(this.isCementCompany);
//    });
  //}
  backToAdmissionForm(stepper: MatStepper){
    this.scroll();
    this.admissionFormMappingService.count.next(0);
    this.admissionFormMappingService.attachmentArrForApi.next([]);
    this.admissionFormMappingService.invoiceForApi.next(null);
    this.admissionFormMappingService.requestDetailForApi.next([])
    this.admissionFormService.nextPage.next({
      nextPage: false,
      requestId: this.requestId,
    });
    let selectedCompany = this.admissionForm?.currentCompany[0];
    console.log(selectedCompany);
     //check if the company is a cement company
  
     if (selectedCompany?.activity.code === 'RDF-Cement') {
        alert(55550);
       this.isCementCompany = true;
     }
     //this.requestId = res.requestId;
   //  stepper.next();
   this.cdRef.detectChanges();
    stepper.previous();
    stepper.reset();
    
  }
  onSubmitRdfFormData(stepper: MatStepper) {
    this.scroll();
    this.rdfForm.onSubmit();
    stepper.next();
  }
}
