import { FeesAndExpensesService } from '@operations/services/fees-and-expenses.service';
import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { CurrencyRate, ExpensesRequest } from '@operations/models/expensesRequest.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesAndExpensesApiService } from '@operations/services/fees-and-express.api.service';
import { AuthService } from 'app/core/services/auth.service';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';

@Component({
  selector: 'app-fees-and-expenses',
  standalone: true,
  imports: [CommonModule, SharedModule, SubtitleComponent , DynamicFormComponent , SubmitButtonComponent , ReviewerFormComponent],
  templateUrl: './fees-and-expenses.component.html',
  styleUrl: './fees-and-expenses.component.scss',
})
export class FeesAndExpensesComponent implements OnInit {
  @ViewChild('paymentForm') paymentForm!: ElementRef;
  @ViewChild('reviewerForm') reviewerForm!: ReviewerFormComponent;
  feesForm;
  totalForm;
  reviewer: string;
  reviewersList;
  statusArr;
  statusNote;
  requestId
  currencyList
  customerRequest; 
  feesModel;
  isCustomer;
  manualOrAutomatic;
  requestStatus;
  constructor(
    private feesAndExpensesService:FeesAndExpensesService ,     
    private route: ActivatedRoute , 
    private admissionFormUtilitiesService:AdmissionFormUtilitiesService,
    private feesAndExpensesApi : FeesAndExpensesApiService,
    private admissionFormService:AdmissionFormService,
    private router: Router,
    private auth: AuthService,
    private operation:OperationsApiService
    ) {
    
      this.route.params.subscribe((params) => {
        this.requestId = params['requestId'];
      });
    this.isCustomer = this.auth.userRole.includes('customer') && this.auth.userRole.length == 1;
    
   /*this.totalForm = this.feesAndExpensesService.totalForm;
    this.reviewersList = this.feesAndExpensesService.reviewersList;
    this.statusArr = this.feesAndExpensesService.statusArr;
    this.statusNote = this.feesAndExpensesService.statusNote;
    this.reviewer = this.auth.user.username*/
    this.manualOrAutomatic = this.feesAndExpensesService.manualOrVisa;
  }
  ngOnInit(): void {
      this.initCustomerRequest(1);
      this.getCurrency();
  }
  initCustomerRequest(rate){
    console.log(this.requestId);
    this.feesAndExpensesApi.calculateCharge(this.requestId, rate).subscribe((reso=>{
      this.feesModel = reso['content'];
    }));
   }

  calculateTotalFees(paymentForm){
  //  let rdf = (paymentForm.administrativeFees.TotalShipmentWeightInTons * 0.1) ;// paymentForm.totalShipmentWeight;
   // let price = rdf * paymentForm.administrativeFees.pricePerTon ;//* paymentForm.totalShipmentWeight
   // paymentForm.totalFees = paymentForm.administrativeExpensesInEgyptianPounds + (price);
   // this.feesForm.totalFees = paymentForm.totalFees;
    //this.feesForm = this.feesForm;
    //console.log(paymentForm)
    console.log(paymentForm);
    let rate =  paymentForm.administrativeFees.todayCurrencyValue;
    this.feesAndExpensesApi.calculateCharge(this.requestId, rate).subscribe((reso=>{
      this.feesModel = reso['content'];
      console.log(this.feesModel);
      paymentForm.administrativeFees.totalRequest = this.feesModel.totalFee;
      paymentForm.administrativeFees.totalRdf = this.feesModel.rdfTotal
      this.feesModel.rate = rate;
      this.feesForm = this.feesAndExpensesService.initForm(this.feesModel, this.customerRequest, this.auth.userRole.includes('customer'));
    }));

  }
  changeRadio($event){
    alert(2222);
  }
  getCurrency() {
    this.admissionFormUtilitiesService.getCurrency().subscribe(response => {
        this.feesAndExpensesService.currencyList = response.content
        
         
      this.feesAndExpensesApi.getRequestById(this.requestId).subscribe(res =>{
        this.customerRequest = res['content'];
        this.requestStatus = this.customerRequest.status; 
       
        this.feesForm = this.feesAndExpensesService.initForm(this.feesModel, this.customerRequest, this.auth.userRole.includes('customer'));
        this.manualOrAutomatic = this.feesAndExpensesService.manualOrVisa;
        console.log(this.manualOrAutomatic);
        console.log(this.requestStatus);
      })
      
        
      });
      
  }
  submitConfirmExpenses(paymentForm){
    this.operation.updateRequestStatus(this.requestId,'ConfirmPaymentEEA').subscribe(respose=>{
      this.router.navigate([`/operations/acceptInvoiceForm/${this.requestId}`])
    });
  }
  NavigateToTemplate(){
    console.log(this.requestStatus);
    if(this.requestStatus == 'ConfirmPaymentEEA' || this.requestStatus == 'AcceptForm'){
      this.router.navigate([`/operations/acceptInvoiceForm/${this.requestId}`]); 
    }
  }
  submitExpenses(paymentForm) {
    let currencyRate: CurrencyRate = {
      currencyId: paymentForm['administrativeFees'].currencyId,
      date: paymentForm['administrativeFees'].date,
      rate: paymentForm['administrativeFees'].todayCurrencyValue
    }
    
    let expenses: ExpensesRequest = {
      edaraFees :  paymentForm['administrativeFees'].administrativeFeePercentage,
      currencyId: paymentForm['administrativeFees'].currencyId,
      ratioEdaraFee: paymentForm['administrativeFees'].administrativeFeePercentage,
      requestId: this.requestId ,
      tonPrice: paymentForm['administrativeFees'].pricePerTon,
      totalTon: paymentForm['administrativeFees'].TotalShipmentWeightInTons,
      currencyRate: currencyRate,
      rdfTotal:paymentForm['administrativeFees'].rdfTotal,
      totalFee:paymentForm['administrativeFees'].totalRequest
    }
      if(!this.isCustomer){ 
    this.feesAndExpensesApi.submitExpenses(expenses).subscribe(response => {
  //    this.reviewerForm.submitReviewerStatus()
  if(response){
  this.operation.updateRequestStatus(this.requestId,'AcceptProtectEEA').subscribe(respose=>{
    this.router.navigate(['/operations/requestsSubmitted'])
  });
}
    })
  }else{
    this.operation.updateRequestStatus(this.requestId,'CustomerPAID').subscribe(respose=>{
      this.router.navigate(['/operations/requestsSubmitted'])
    });
  }
  
  }
}import { DynamicCheckboxComponent } from '@shared/components/dynamic-form/components/dynamic-field/components/dynamic-checkbox/dynamic-checkbox.component';

