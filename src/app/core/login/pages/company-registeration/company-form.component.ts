import { TranslationService } from 'app/language/translation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { RegisterCompanyService } from '@login/services/company-registeration/register-company.service';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { CompanyType } from '@shared/model/company-type';
import { ActivityType } from '@shared/model/activity-type';
import { Governerate } from '@shared/model/gov-response';
import { RegisterCompanyFormSerivce } from '@login/services/company-registeration/register-company.form.service';
import { RegisterCompanyRequest } from '@login/model/register-company.model';
import { RegisterCompanyApiService } from '@login/services/company-registeration/register-company.api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyAttachmentMappingService } from '@login/services/company-attachment-mapping.service';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    SubtitleComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit , OnDestroy {
  model: FormGroup;
  companyTypes: CompanyType[];
  activityTypes: ActivityType[];
  govList: Governerate[];
  subscription: Subscription
  user;
  constructor(
    private registerCompanyFormService: RegisterCompanyFormSerivce,
    private registerCompanyService: RegisterCompanyService,
    private companyAttachmentMappingService: CompanyAttachmentMappingService,
    private utilApiService: UtilitiesApiService,
    private registerCompanyHttpService: RegisterCompanyApiService,
    private router: Router,
    private auth: AuthService,
    private translationService : TranslationService
  ) {}


  ngOnInit(): void {
    this.initFormWithRequiredData()
    this.user = this.auth.user
  }

  initFormWithRequiredData() {
    this.getCompanyTypes();
    this.getActivityTypes()
    this.getGovList()
  }

  getCompanyTypes() {
    this.utilApiService.getCompanyTypes().subscribe((response) => {
      this.registerCompanyFormService.setCompanyTypeList(response.content)
    });

  }

  getActivityTypes() {
    this.utilApiService.getActivityTypes().subscribe((response) => {
      this.registerCompanyFormService.setActivityTypeList(response.content)
    });

  }

  getGovList() {
    this.utilApiService.getGovList().subscribe((response) => {
      this.registerCompanyFormService.setGovList(response.content)
      this.model = this.registerCompanyFormService.initForm()
    });
  }

  onSubmit(form) {
    if(form.valid){
      let formData : RegisterCompanyRequest
      this.companyAttachmentMappingService.setFormData(form.value);
      this.subscription = this.companyAttachmentMappingService.isDataReady.subscribe(status => {
        if(status) {
          let attachments = this.companyAttachmentMappingService.attachmentsArray
          formData = this.registerCompanyService.mapRegisterCompanyData(form.value , attachments , this.user)
          this.registerCompanyHttpService.registerCompany(formData).subscribe(response => {
            this.router.navigate(['/main/login'])
        })
        }
      })
    }else{
      this.translationService.toastrTranslation('error','toastr.enterValidValues');
      form.markAllAsTouched();
    }
    
  }

  ngOnDestroy() {
    if(this.subscription)this.subscription.unsubscribe()
  }
}
