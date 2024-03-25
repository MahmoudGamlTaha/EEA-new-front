import { TranslationService } from 'app/language/translation.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DigitalSealingSubmitionComponent } from '@operations/pages/digital-sealing-submition/digital-sealing-submition.component';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyValidationFormSerivce } from '@login/services/company-validation/company-validate-form.service';
import { CompanyAttachmentMappingService } from '@login/services/company-attachment-mapping.service';
import { Subscription } from 'rxjs';
import { CompanyValidationSerivce } from '@login/services/company-validation/company-validate.service';
import { CompanyValidationApiSerivce } from '@login/services/company-validation/company-validate-api.service';
import { ValidateCompanyRequest } from '@login/model/validate-company.model';

@Component({
  selector: 'app-company-validation',
  standalone: true,
  imports: [CommonModule ,     ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    SubtitleComponent,
    DigitalSealingSubmitionComponent , MatStepperModule , TranslateModule ],
  templateUrl: './company-validation.component.html',
  styleUrl: './company-validation.component.scss'
})
export class CompanyValidationComponent implements OnInit {
  model;
  companySubscription: Subscription
  submitSubscription: Subscription
  selectedCompanyId
  constructor(
    private companyValidationForm: CompanyValidationFormSerivce,
    private dialog: MatDialog, 
    private router: Router, 
    private companyAttachmentMappingService: CompanyAttachmentMappingService , 
    private companyValidationService: CompanyValidationSerivce,
    private companyValidationApiService: CompanyValidationApiSerivce,
    private translationService : TranslationService
  ) {
  }
  ngOnInit(): void {
    this.companySubscription = this.companyValidationService.selectedCompany.subscribe(company => {
      this.model = this.companyValidationForm.initForm(company)
      this.selectedCompanyId = company.id
    })
  }

  onSubmit(form) {
  
    let formData : ValidateCompanyRequest
    if(form.valid){
      this.companyAttachmentMappingService.setFormData(form.value);
    this.submitSubscription = this.companyAttachmentMappingService.isDataReady.subscribe(status => {
      if(status) {
        let attachments = this.companyAttachmentMappingService.attachmentsArray
       console.log(this.selectedCompanyId);
       
        formData = this.companyValidationService.mapValidateCompanyData(form.value , attachments , this.selectedCompanyId)
        this.companyValidationApiService.validateCompany(formData).subscribe(response => {
          this.router.navigate(['/operations'])
      })
      }
    }, error=>this.translationService.toastrTranslation('error','toastr.enterValidValues'))
    }else{
      this.translationService.toastrTranslation('error','toastr.enterValidValues');
      form.markAllAsTouched();
    }
    
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe()
    if(this.submitSubscription)this.submitSubscription.unsubscribe()
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
      this.router.navigate(['/operations/statistics'])
    });
  }
}
