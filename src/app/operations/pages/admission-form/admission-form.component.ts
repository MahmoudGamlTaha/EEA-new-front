import { AdmissionFormMappingService } from './../../services/admission-form/admission-form-mapping.service';
import { AdmissionFormApiService } from './../../services/admission-form/admission-form-api.service';
import { TranslationService } from 'app/language/translation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import {
  CaseModel,
  DigitalSealModel,
  DocumentModel,
  MainModel,
} from '@operations/models/customerForm.model';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { AuthService } from 'app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { CompanyApiService } from '@shared/services/company.api.service';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { AdmissionFormModelsService } from '@operations/services/admission-form/admission-form-models.service';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';
import { Subscription, take } from 'rxjs';
import { OperationsService } from '@operations/services/operations.service';
import { CementCompanyRdfService } from '@operations/services/cement-company-rdf.service';
import { RdfApisService } from '@operations/services/rdf-apis.service';
import { ToastrService } from 'ngx-toastr';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { FeesAndExpensesService } from '@operations/services/fees-and-expenses.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';

@Component({
  selector: 'app-admission-form',
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
  templateUrl: './admission-form.component.html',
  styleUrl: './admission-form.component.scss',
})
export class AdmissionFormComponent {
  @ViewChild('cardForm') cardForm!: ElementRef;
  @ViewChild('documentForm') documentForm!: ElementRef;
  @ViewChild('caseForm') caseForm!: ElementRef;
  @ViewChild('rdfForm') rdfForm!: ElementRef;
  @ViewChild('digitalSealingForm') digitalSealingForm!: ElementRef;
  @Input() withCheckBox: boolean = true;
  case: boolean = true;
  mainModel: MainModel;
  documentModel: DocumentModel;
  caseModel: CaseModel;
  digitalSealingModel: DigitalSealModel;
  mainModelArrays: {};
  attachmentsData;
  companies;
  formType;
  requestId;
  ownerCompaniesArr;
  submittedObj = null;
  attachmentsArr;
  requestDetail;
  invoice;
  countSubscription: Subscription;
  submitSubscription: Subscription;
  attachmentSubscription: Subscription;
  requestDetailSubscription: Subscription;
  invoiceSubscription: Subscription;
  customerRequestData;
  rdfRequestId;
  pendingRdf;
  isRdfRequestReady;
  inputsList
  inputsListIds
  statusArr;
  statusNote;
  mainNote;
  reviewersList;
  isCementCompany;
  loggerList ;
  reviewer: string = 'مصطفى محمد';

  count = 0;
  constructor(
    private admissionFormModelsService: AdmissionFormModelsService,
    private admissionFormService: AdmissionFormService,
    private admissionFormApiService: AdmissionFormApiService,
    private admissionFormMappingService: AdmissionFormMappingService,
    protected auth: AuthService,
    private route: ActivatedRoute,
    private requestSubmittedService: RequestSubmittedService,
    private companyApiService: CompanyApiService,
    private operationsApiService: OperationsApiService,
    private router: Router,
    private translationService: TranslationService,
    private admissionFormUtilitiesService: AdmissionFormUtilitiesService,
    private rdfApiService: RdfApisService,
    private cementRdfService : CementCompanyRdfService,
    private operationsService : OperationsService,
    private toastr: ToastrService,
    private feeService:FeesAndExpensesService,
    private requestCoreService:RequestCoreService
  ) {
    this.statusArr = this.admissionFormModelsService.statusArr;
    this.statusNote = this.admissionFormModelsService.statusNote;
    this.reviewersList = this.admissionFormModelsService.reviewersList;
    this.mainNote = this.admissionFormModelsService.mainNote;





    this.documentModel = this.admissionFormModelsService.getDocumentModel();
    this.caseModel = this.admissionFormModelsService.getCaseModel();
    this.digitalSealingModel =
      this.admissionFormModelsService.digitalSealingModel;
    this.attachmentSubscription =
      this.admissionFormMappingService.attachmentArrForApi.subscribe((res) => {
        this.attachmentsArr = res;
      });
    this.requestDetailSubscription =
      this.admissionFormMappingService.requestDetailForApi.subscribe(
        (requestDetail) => {
          this.requestDetail = requestDetail;
        }
      );

    this.invoiceSubscription =
      this.admissionFormMappingService.invoiceForApi.subscribe((invoice) => {
        this.invoice = invoice;
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.formType = params['type'];
      this.requestId = params['id'];
      this.mainModelArrays = {};
      this.mainModel = null;
      
      this.getCurrencyArr();

      // if user  is rdf department supervisor
      // if (
      //   this.auth.user.sub['administrativeId'] == 4 &&
      //   this.auth.user.sub['roles'].includes('department_supervisor')
      // ) {
      //  
      // }
    });
    // this.getCurrencyArr();
  }

  getCurrencyArr() {
    this.admissionFormUtilitiesService.getCurrency().subscribe((res) => {
      this.mainModelArrays = {
        ...this.mainModelArrays,
        currencyArr: res['content'],
      };
      this.getOwnerCompaniesArr();
    });
  }

  getOwnerCompaniesArr() {
    this.companyApiService
      .getCompanyByOwnerId(this.auth.user.sub.id)
      .subscribe((res) => {
        this.mainModelArrays['ownerCompaniesArr'] = res['content'];
        this.ownerCompaniesArr = res['content'];
        this.getCountryArr();
      });
  }
 
  getCountryArr() {
    this.admissionFormUtilitiesService.getCountry().subscribe((res) => {
      this.mainModelArrays['countryArr'] = res['content'];
      this.getHarborArr();
    });
  }

  getHarborArr() {
    this.admissionFormUtilitiesService.getHarborList().subscribe((res) => {
      this.mainModelArrays['harborArr'] = res['content'];
      this.getCoalType();
    });
  }
  getCoalType() {
    this.admissionFormUtilitiesService.getCoalType().subscribe((res) => {
      this.mainModelArrays['coalType'] = res['content'];
      this.getUnloadMethod();
    });
  }
  getUnloadMethod() {
    this.admissionFormUtilitiesService.getUnloadMethod().subscribe((res) => {
      this.mainModelArrays['unloadMethod'] = res['content'];
      this.getAllCompanies();
    });
  }

  getAllCompanies() {
    this.admissionFormUtilitiesService.getAllCompanies().subscribe((res) => {
      this.mainModelArrays['allCompanies'] = res['content'];
      this.companies = res['content'];
      
      if (this.formType == 'check' || this.formType =='view-only') {
        this.getRequestById(this.requestId);
      } else if (this.formType == 'edit') {
        this.getInputFieldsToBeEditted(this.requestId);
      } else {
        this.mainModel = this.admissionFormModelsService.getMainModel(
          this.mainModelArrays,undefined,undefined,this.auth.userRole
        );
      }
    });
  }

  getRequestById(id, inputFieldsList?) {
    this.requestSubmittedService
      .getCustomerRequestById(id)
      .subscribe((request) => {
        this.customerRequestData = request['content']
        console.log(this.ownerCompaniesArr);
         let requestCompnay = this.companies.filter((c)=>{
        return c.id == this.customerRequestData.companyId
        })[0];
      this.admissionFormApiService.selectedCompany.next(this.customerRequestData.companyId)  ;
        console.log(requestCompnay);
        this.isCementCompany = requestCompnay?.activity.code == 'RDF-Cement'?true:false;
        this.mainModel = this.admissionFormModelsService.getMainModel(
          this.mainModelArrays,
          request['content'],
          inputFieldsList,
          this.auth.userRole[0]
        );
        this.digitalSealingModel = this.admissionFormModelsService.digitalSealingModel;
        let documentreq = {};
        for (let attachment of request['content'].attachments) {
          let key = attachment['fileField'];
          documentreq[key] = attachment;
        }
        this.documentModel =
          this.admissionFormModelsService.getDocumentModel(documentreq);
        this.caseModel =
          this.admissionFormModelsService.getCaseModel(documentreq);
        if(request['content'].category == 1 || this.isCementCompany) {
          this.pendingRdf = true
          console.log(this.isCementCompany);
          this.getRdfRequestById(this.requestId);
        }
        if(request['content'].status == 'AcceptProtectEEA' ){
              this.formType = 'view-only'
        }
     
      });
      
  }

  getInputFieldsToBeEditted(id) {
    this.operationsApiService.getInputField(id).subscribe((response) => {
      this.inputsList = response.content.map((field) => field.field);
      this.inputsListIds = response.content.map(field => field.id)
      this.getRequestById(id, this.inputsList);
    });
  }

  getRdfRequestById(id) {
    console.log(id);
    this.isRdfRequestReady = false
    this.rdfApiService
    .getRdfRequestById(id)
    .subscribe((request) => {
      console.log(request.content);
      this.cementRdfService.initForm(this.customerRequestData,this.formType,request.content)
      this.isRdfRequestReady = true
       this.invoice = this.cementRdfService.invoiceData;
    });

  }

  onSubmit() {
    console.log(this.formType);
    if (this.auth.userRole.includes('customer') && this.formType == 'add') {
      this.submitForm(false);
    } else if(this.auth.userRole.includes('customer') && this.formType == 'edit') {
      this.submitForm(true);
    } else {
      this.reviewForm();
    }
  }

  reviewForm() {
    let requestStatus = this.operationsService.getStatus(this.auth.user.sub.administrativeId);
    let cardForm = this.cardForm['dynamicFormGroup'].value;
    let rdfForm ;//= this.getRdfRequestById(this.requestId);
    let invoiceDetails
    let totalRdfForm
    let wastePercentage
    
    if(this.pendingRdf) {
     
      //rdfForm = this.rdfForm;
      //invoiceDetails = this.rdfForm['invoiceDetails']['dynamicFormGroup'].value;
      //totalRdfForm = this.rdfForm['totalRdfForm']['dynamicFormGroup'].value;
      //wastePercentage = this.rdfForm['wastePercentage']['dynamicFormGroup'].value;
      }
    if(this.formType == 'check' && this.auth.user.sub.administrativeId == 11) {
      this.initStatusforReviewForm(requestStatus , {invoiceDetails , totalRdfForm , wastePercentage} , this.pendingRdf, this.formType)
    }else if(!this.pendingRdf) {
     this.initStatusforReviewForm(requestStatus , {cardForm}, false, this.formType)
    }
   else{
     this.initStatusforReviewForm(requestStatus , {invoiceDetails , totalRdfForm , wastePercentage} , this.pendingRdf, this.formType)
    
    }
  }

  initStatusforReviewForm( requestStatus , forms , isRdf, formType) {
    let inputsList = []
    let clearList = [];
    let checkerInputs = []
   
    if(!isRdf){
      console.log('form enable');
      checkerInputs = this.admissionFormService.checkerForm(forms);
      checkerInputs.map((input) => {
        console.log("input" , input);
       
        if (input.value != true) {
          inputsList.push(input.key.replace('Checker', ''))
          requestStatus = 'CompleteEntry';
        }else{
           clearList.push(input.key.replace('Checker', ''));
        }
      });
      console.log("inputsList" , inputsList);
      console.log("clearList", clearList);

      if(clearList.length > 0)
          this.operationsApiService.clearInputField(this.requestId, clearList);
          this.feeService.setCustomerRequest(this.customerRequestData);
          console.log(this.feeService.customerRequest);
          this.router.navigateByUrl('operations/feesAndExpenses/'+ this.requestId);
          
    }
    
      if(formType == 'check'){
      this.submitReviewForm(requestStatus , inputsList , isRdf)
      }
    //  else{
        
      //}
    }

    submitReviewForm(status , inputsList , isRdf) {
     
      if(isRdf){
        this.admissionFormService.nextPage.next({
          nextPage: true,
          requestId: this.requestId,
        });
        console.log("zeft");
        console.log('return RDF');
        return;
      }
      
      this.operationsApiService
      .updateRequestStatus(this.requestId, status)
      .subscribe((response) => {});
      if(inputsList.length > 0){
      this.operationsApiService.submitInputField(this.requestId, inputsList).subscribe((response) => {
            });
          }
            this.toastr.success('Status Submitted Successfully');
      this.router.navigateByUrl('operations/requestsSubmitted');

    }
  
  submitForm(isEditForm) {
 
    //console.log(this.submitSubscription);
    let cardForm = this.cardForm['dynamicFormGroup'];
    let documentForm = this.documentForm['formGroup'];
    let caseForm = this.caseForm['formGroup'];
    let digitalSealingForm = this.digitalSealingForm['formGroup'].value;
    this.admissionFormApiService.selectedCompany.next(cardForm?.value.companyId);
    this.admissionFormMappingService.getAttachmentRes({
      cardForm,
      documentForm,
      caseForm,
      digitalSealingForm,
    });

    this.countSubscription = this.admissionFormMappingService.count.subscribe(
      (count) => {
        console.log(count);
        if (count === 15) {
          for (const key in this.requestDetail) {
            let company = this.companies.filter(
              (company) => company.id == this.requestDetail[key].companyId
            );
            if (company && company[0]) {
              this.requestDetail[key].companyActivityId = company[0].activityId;
            }
          }
          this.requestDetail =
            this.admissionFormMappingService.requestDetailsMapping(
              this.requestDetail
            );
          //         console.log(this.requestDetail);
          let formReq = {
            ...this.cardForm['dynamicFormGroup'].value,
            ...this.cardForm['dynamicFormGroup'].value.shipmentWeight,
            invoice: this.invoice,
            requestDetail: this.requestDetail,
            attachments: this.attachmentsArr,
            ...digitalSealingForm,
          };
          console.log(formReq);
          if(isEditForm) {
            this.submitSubscription = this.admissionFormApiService
            .onEditAddmissionFormData(formReq , this.requestId)
            .pipe(take(1))
            .subscribe(
              (res) => {
                this.admissionFormService.nextPage.next({
                  nextPage: true,
                  requestId: res.content['id'],
                });
                this.requestCoreService.setCustomerRequestStatus(res.content['status']);
                this.countSubscription.unsubscribe();
                this.submitSubscription.unsubscribe();
                this.attachmentSubscription.unsubscribe();
                this.invoiceSubscription.unsubscribe();
                this.requestDetailSubscription.unsubscribe();
              },
              (error) => {
                this.translationService.toastrTranslation(
                  'error',
                  'toastr.enterValidValues'
                );
                this.submittedObj = null;
                this.admissionFormMappingService.count.next(0);
                this.admissionFormMappingService.attachmentArrForApi.next([]);
                this.submitSubscription.unsubscribe();
              }
            );
          } else {
            this.submitSubscription = this.admissionFormApiService
            .onSubmitAdmissionFormData(formReq)
            .pipe(take(1))
            .subscribe(
              (res) => {
                this.admissionFormService.nextPage.next({
                  nextPage: true,
                  requestId: res.content['id'],
                });
                this.requestCoreService.setCustomerRequestStatus(res['status']);
                return;
              /*  this.countSubscription.unsubscribe();
                this.submitSubscription.unsubscribe();
                this.attachmentSubscription.unsubscribe();
                this.invoiceSubscription.unsubscribe();
                this.requestDetailSubscription.unsubscribe();*/
              },
              (error) => {
                this.translationService.toastrTranslation(
                  'error',
                  'toastr.enterValidValues'
                );
                this.submittedObj = null;
                this.admissionFormService.nextPage.next({ nextPage: false, requestId: null });
                this.admissionFormMappingService.count.next(0);
                this.admissionFormMappingService.attachmentArrForApi.next([]);
              }
            );
          }

        }
      }
    );
  }
}
