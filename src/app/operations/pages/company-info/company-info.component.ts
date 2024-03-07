import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'app/language/translation.service';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { RegisterCompanyFormSerivce } from '@login/services/company-registeration/register-company.form.service';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';
import { CompanyApiService } from '@shared/services/company.api.service';
import { AuthService } from 'app/core/services/auth.service';
import { Company } from '@shared/model/company';
import { CompanyValidationSerivce } from '@login/services/company-validation/company-validate.service';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [CommonModule, SubtitleComponent , DynamicFormComponent , TranslateModule, BtnComponent , SelectDropdownComponent],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent {
  model;
  currentLang
  companiesList: any
  selectedCompany: Company;
  constructor(
    private registerCompanyFormService: RegisterCompanyFormSerivce,
    private ts:TranslationService,
    private companyApiService: CompanyApiService,
    private companyValidationService: CompanyValidationSerivce,
    private utilApiService: UtilitiesApiService,
    public authService: AuthService,
  ) {
    this.model = this.registerCompanyFormService.initForm();
    this.currentLang = this.ts.currentLang
    this.getCompaniesListByOwnerId()
  }

  getCompaniesListByOwnerId() {
    this.companyApiService.getCompanyByOwnerId(this.authService.user.sub.id).subscribe(response => {
      this.companiesList = response.content
      this.companyValidationService._companiesList = response.content
    })
  }

  onSelectCompany(id) {
    this.model = this.registerCompanyFormService.initForm(this.companiesList.find(company => company.id == id));
  }

  ngOnInit(): void {
    this.initFormWithRequiredData()
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
    });
  }

  editCompany() {}
}
