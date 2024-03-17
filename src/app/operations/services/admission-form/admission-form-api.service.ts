import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormApiService {
  baseUrl: string;
  selectedCompany = new BehaviorSubject(null);

  constructor(private auth: AuthService, private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  onSubmitAdmissionFormData(form) {
    console.log(form);
    for (const key in form) {
      if (
        key === 'HARBOR_LANDING_RIVER' ||
        key === 'STORE_ACCEPT_PAPER' ||
        key === 'STORE_INTERMEDIATE_PAPER' ||
        key === 'TRANSPORT_ACCEPT_PAPER' ||
        key === 'UNLOAD_ACCEPT_PAPER' ||
        key === 'shipmentWeight'
      ) {
        delete form[key];
      }
    }
    console.log(form);
    this.selectedCompany.next(form.companyId);
    let initform = {
      ...form,
      requesterId: this.auth.user['sub'].id,
      name: form.requestType?form.requestType.name:'request',
      code: '',
      requestTypeId: 1,
      notes: 'notes from lead',
      commentsList: null,
    };
    const url = this.baseUrl + '/portal/customer-request';
    return this.http.post<ApiResponse>(url, initform);
  }

  onEditAddmissionFormData(form , requestId) {
    for (const key in form) {
      if (
        key === 'HARBOR_LANDING_RIVER' ||
        key === 'STORE_ACCEPT_PAPER' ||
        key === 'STORE_INTERMEDIATE_PAPER' ||
        key === 'TRANSPORT_ACCEPT_PAPER' ||
        key === 'UNLOAD_ACCEPT_PAPER' ||
        key === 'shipmentWeight'
      ) {
        delete form[key];
      }
    }
    this.selectedCompany.next(form.companyId);
    let initform = {
      ...form,
      requesterId: this.auth.user['sub'].id,
      name: form.requestType.name,
      code: '',
      requestTypeId: 1,
      notes: 'notes from lead',
      commentsList: null,
    };
    console.log(form, initform);
    const url = `${this.baseUrl}/portal/customer-request/${requestId}`;
    return this.http.put<ApiResponse>(url, initform);
  }

  getRequestLog(requestId:number){
     const url = `${this.baseUrl}/portal-data/logger/request-log/${requestId}`;
     return this.http.get<ApiResponse>(url);
  }
}
