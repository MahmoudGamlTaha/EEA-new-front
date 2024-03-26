import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { MenutItem } from 'app/core/layout/models/menu-header.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyApiService {
  baseUrl = environment.apiUrl
  constructor(protected httpClient: HttpClient) {
  }

  getCompanyByOwnerId(id) {
    let apiUrl =  `${this.baseUrl}/portal-data/company/find-by-owner?ownerId=${id}`
    return this.httpClient.get<ApiResponse>(apiUrl)
  }
  getCompanyById(id){
    let apiUrl =  `${this.baseUrl}/portal-data/company/${id}`
    return this.httpClient.get(apiUrl)
  }

}
