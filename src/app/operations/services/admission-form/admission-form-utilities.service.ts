import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionFormUtilitiesService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = environment.apiUrl;
   }

  getCurrency() {
    const url = this.baseUrl + '/basic-data/currency';
    return this.http.get<ApiResponse>(url);
  }

  getCountry() {
    const url = this.baseUrl + '/basic-data/country';
    return this.http.get(url);
  }

  getHarborList() {
    const url = this.baseUrl + '/basic-data/harbor';
    return this.http.get(url);
  }

  getCoalType() {
    const url = this.baseUrl + '/basic-data/coal-type';
    return this.http.get(url);
  }
  getUnloadMethod() {
    const url = this.baseUrl + '/basic-data/unload-way';
    return this.http.get(url);
  }

  getAllCompanies() {
    const url = this.baseUrl + '/portal-data/company';
    return this.http.get(url);
  }
}
