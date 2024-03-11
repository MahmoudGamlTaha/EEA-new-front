import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RdfApisService } from '../rdf-apis.service';
import { CementCompanyRdfService } from '../cement-company-rdf.service';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormService {
  nextPage = new BehaviorSubject({ nextPage: false, requestId: null });
  customerRequest;
  IsCementCompany;
  constructor( private rdfApiService : RdfApisService , private cementRdfService : CementCompanyRdfService) {}

  isInputToBeEdited(input, inputsList): boolean {
    return inputsList?.includes(input);
  }

  getCompanyDetailsByType(request , fileField) {
    return request?.requestDetail.find(company => company.companyAcceptance.fileField === fileField && company.companyAcceptanceNumber)
   }

  checkerForm(forms) {
  
    let checkerInputs = [];
    for (const formKey in forms) {
      if (Object.prototype.hasOwnProperty.call(forms, formKey)) {
        const currentForm = forms[formKey]; //get forms with values
        Object.entries(currentForm)
          .filter(([key, value]) => key.toLowerCase().includes('checker'))
          .forEach(([key, value]) => checkerInputs.push({ key, value }));
      }
    }
    return checkerInputs;
  }
  checkFormDimmed(forms){
    for (const formKey in forms) {
      if (Object.prototype.hasOwnProperty.call(forms, formKey)) {
        const currentForm = forms[formKey]; //get forms with values
        Object.entries(currentForm)
          .filter(([key, value]) => key.toLowerCase().includes('checker'))
          .forEach(([key, value]) => {
            // Check if the key is a checkbox
            
              console.log(currentForm[key]);
              currentForm[key].value = true; // Set the checkbox value to true
            
          });
      }
    }
  }

  // Customer can not move to other page without check on all digital sealing endorsement
  checkDigitalSealingFields(digitalSealingForm): boolean {
    let digitalSealingConfirmed: boolean;
    for (let key in digitalSealingForm) {
      if (!digitalSealingForm[key]) {
        digitalSealingConfirmed = false;
        break;
      }
      digitalSealingConfirmed = true;
    }
    return digitalSealingConfirmed;
  }
   setcustomerRequest(request){
    this.customerRequest = request;
  }
/*  getRdfRequestById(id) {
    this.rdfApiService.getRdfRequestById(id).subscribe((request) => {
      this.cementRdfService.initForm( request, true, request.content);
    });
  }*/
}
