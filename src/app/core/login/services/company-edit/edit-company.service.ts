import { Injectable } from '@angular/core';
import { EditCompanyRequest } from '@login/model/register-company.model';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';

@Injectable({
  providedIn: 'root',
})
export class EditCompanyService {

  editCompanyRequest: EditCompanyRequest
  constructor() {}

  mapRegisterCompanyData(formData , attachments ) {
    return this.editCompanyRequest ={
      name: formData.name,
      managerName: formData.managerName,
      commercialNumber: formData.commercialNumber,
      taxNumber: formData.taxNumber,
      industryNumber: formData.industryNumber,
      acceptEEANumber: formData.acceptEEANumber,
      activityId: Number(formData.activityId),
      userId: 5, // to be changed when userId be added inside the token
      importCardNumber: '3243434', //
      phoneNumber: formData.name,
      email: formData.email,
      quotaValidFrom: formData.quotaValidFrom,
      quotaValidTo: formData.quotaValidTo,
      quota: Number(formData.quota),
      purpose: formData.purpose,
      address: formData.address,
      companyTypeId: Number(formData.companyTypeId),
      attachments: attachments,
      renewPermitStatus: formData.renewPermitStatus,
      // gov_id:  1,
    };
  }




}
