
import { Injectable } from '@angular/core';
import { ValidateCompanyRequest } from '@login/model/validate-company.model';
import { AttachmentRequestBody } from '@shared/model/attachment-request-body.model';
import { BehaviorSubject } from 'rxjs';
import { CompanyAttachmentMappingService } from '../company-attachment-mapping.service';
import { Company } from '@shared/model/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyValidationSerivce {
  private initialCompany: Company = {};
  private selectedCompanyId;
  private companiesList;
  selectedCompany = new BehaviorSubject<Company>(this.initialCompany)
  validateCompanyRequest: ValidateCompanyRequest

  constructor() {}

  mapValidateCompanyData(formData , attachments , companyId) {
    return this.validateCompanyRequest ={
      customerName: formData.name,
      job: formData.position,
      nationalNumber: formData.nationalId,
      companyId: companyId,
      commercialNumber: Number(formData.comRegisterNum),
      taxNumber: formData.taxNumber,
      phoneNumber: formData.name,
      email: formData.email,
      attachments: attachments,
    };
  }

  public set _companiesList(companies) {
    this.companiesList = companies
  }

  public set _selectedCompanyId(companyId) {
    this.selectedCompanyId = companyId
    this.setSelectedCompany()
  }

  public get getSelectedCompany() {
    return this.selectedCompanyId
  } 

  setSelectedCompany() {
    let company = this.companiesList.find(company =>  company.id == this.selectedCompanyId)
    if(company) this.selectedCompany.next(company)
 
  }

}
