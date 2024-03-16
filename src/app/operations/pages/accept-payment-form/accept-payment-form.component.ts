import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';
import { FeesAndExpensesService } from '@operations/services/fees-and-expenses.service';
import { FeesAndExpensesApiService } from '@operations/services/fees-and-express.api.service';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { RequestCoreService } from 'app/core/services/RequestCore.service';
import { AuthService } from 'app/core/services/auth.service';
import { TranslationService } from 'app/language/translation.service';
import { ToastrService } from 'ngx-toastr';
// form 33
TranslatePipe
@Component({
  selector: 'app-accept-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    AttachedDocumentsComponent,
    DigitalSealingFormComponent,
    SubmitButtonComponent,
    SubtitleComponent,
    RdfFormComponent,
    ReviewerFormComponent
  ],
  templateUrl: './accept-payment-form.component.html',
  styleUrl: './accept-payment-form.component.scss'
})
export class AcceptPaymentFormComponent implements OnInit {
  requestId;
  invoiceOfRequest;
  totalInvoice:number = 0;
  requestStatus;
//   form: FormGroup;
  constructor( private formBuilder: FormBuilder, private router:Router,
    private route: ActivatedRoute,
    private fees:FeesAndExpensesApiService,  
    private feeService:FeesAndExpensesService,
    private requestCoreService:RequestCoreService,        
    private operationsApiService:OperationsApiService,
    private toastr: ToastrService ){
      this.route.params.subscribe((params) => {
        this.requestId = params['requestId'];
      });
      this.requestCoreService.customerRequestStatus
  }
  ngOnInit() :void {
   console.log(this.feeService.customerRequest?.status);
      this.fees.getPaidInovice(this.requestId).subscribe( val=>{
         this.invoiceOfRequest = val['content'];
         console.log(this.invoiceOfRequest);
         this.requestStatus = this.requestCoreService.getCustomerRequestStatus();
         this.initForm();
         });
    }
    initForm(){ //no need
      let invoiceRows:Array<any> = [];

      this.invoiceOfRequest.requestFeesInvoiceDetailDtoList.forEach((element:any) => {
        this.totalInvoice += element.amount;
        invoiceRows.push(element);
      });
 /*     this.form = this.formBuilder.group({
        date:  this.invoiceOfRequest.createdDate,
        entityName: this.invoiceOfRequest.entityName,
        establishCode: this.invoiceOfRequest.establishCode,
        requesterName:this.invoiceOfRequest.requesterName,
        paymentType : this.invoiceOfRequest.paymentType,
        invoiceNumber : this.invoiceOfRequest.invoiceNumber,
        FeesInArabic: this.invoiceOfRequest.FeesInArabic,
        requestId: this.invoiceOfRequest.requestId,
        totalFee : this.invoiceOfRequest.totalFee,
        requestFeesInvoiceDetail:invoiceDetails
      })*/
    }
    print(){
      window.print();
    }
    backToexpense(){
      
      this.router.navigateByUrl('operations/feesAndExpenses/'+ this.requestId);
   
    }
    sendToCoalAdministration(){
        
        this.operationsApiService.updateRequestStatus(this.requestId,"AcceptForm").subscribe((res)=>{
          this.toastr.success('Status Submitted Successfully');
           this.router.navigateByUrl('operations/requestsSubmitted');

        });
    }
    NavigateToAcceptTemplateForm(){
      this.router.navigateByUrl(`operations/acceptFormTemplate/${this.requestId}`);
    }

}