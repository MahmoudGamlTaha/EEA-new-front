import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityTypeResponse } from '@shared/model/activity-type';
import { ApiResponse } from '@shared/model/api-response.model';
import { CompanyTypeResponse } from '@shared/model/company-type';
import { GovResponse } from '@shared/model/gov-response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesApiService {
  baseUrl = environment.apiUrl

  constructor(   private httpClient: HttpClient) { }

  getCompanyTypes() {
    let url = `${this.baseUrl}/portal-data/company-type`
    return this.httpClient.get<CompanyTypeResponse>(url)
  }

  getActivityTypes() {
    let url = `${this.baseUrl}/basic-data/company-activity`
    return this.httpClient.get<ActivityTypeResponse>(url)
  }

  getGovList() {
    let url = `${this.baseUrl}/basic-data/government`
    return this.httpClient.get<GovResponse>(url)
  }

  uploadFile(formData) {
    let apiUrl =  `${this.baseUrl}/portal-data/company/upload`
    return this.httpClient.post<ApiResponse>(apiUrl, formData )
  }
}
