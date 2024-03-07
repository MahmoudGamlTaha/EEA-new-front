
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyValidationApiSerivce {
  baseUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) {}

  validateCompany(form) {
    let apiUrl =  `${this.baseUrl}/portal-data/company/activate`
    return this.httpClient.post(apiUrl, form)
  }
}
