import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { SidebarItem } from '@shared/model/sidebar-item';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationsApiService {

  baseUrl = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  updateRequestStatus(requestId , status , comment?) {
    let url = `${this.baseUrl}/portal/customer-request/change-status?requestId=${requestId}&status=${status}`
    let body = {comment : comment ? comment : null}
    return this.httpClient.put<ApiResponse>(url , body)
  }

  submitInputField(requestId , inputsList) {
    let url = `${this.baseUrl}/portal/customer-request/check-field`
    let body = {
      requestId: requestId,
      field: inputsList
    }
    return this.httpClient.post<ApiResponse>(url , body)
  }

  clearInputField(requestId , inputsList) {
    let url = `${this.baseUrl}/portal/customer-request/clear-error`
    let body = {
      clears: inputsList,
      requestId: requestId,
    }
    return this.httpClient.delete<ApiResponse>(url , {body})
  }

  getInputField(requestId) {
    let url = `${this.baseUrl}/portal/customer-request/list-fields?requestId=${requestId}`
    return this.httpClient.get<ApiResponse>(url)
  }

}
