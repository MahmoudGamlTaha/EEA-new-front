import { Injectable } from '@angular/core';
import { RegisterCompanyApiService } from './register-company.api.service';
import { RegisterCompanyRequest } from '@login/model/register-company.model';
import { AttachmentRequestBody } from '@shared/model/attachment-request-body.model';
import { BehaviorSubject } from 'rxjs';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanyService {

  registerCompanyRequest: RegisterCompanyRequest
  constructor(private utilsApiService:UtilitiesApiService) {}

  mapRegisterCompanyData(formData , attachments  , user) {
    return this.registerCompanyRequest ={
      name: formData.name,
      managerName: formData.managerName,
      commercialNumber: formData.commercialNumber,
      taxNumber: formData.taxNumber,
      industryNumber: formData.industryNumber,
      acceptEEANumber: formData.acceptEEANumber,
      activityId: Number(formData.activityId),
      userId: user.sub['id'], // to be changed when userId be added inside the token
      ownerId:user.sub['id'], 
      importCardNumber: '3243434', //
      phoneNumber: formData.phoneNumber,
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
