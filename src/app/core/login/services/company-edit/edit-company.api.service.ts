import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyApiService } from '@shared/services/company.api.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditCompanyApiService extends CompanyApiService {

  
  editCompany(form , id) {
    let apiUrl =  `${this.baseUrl}/portal-data/company/${id}`
    return this.httpClient.put(apiUrl, form)
  }


}
