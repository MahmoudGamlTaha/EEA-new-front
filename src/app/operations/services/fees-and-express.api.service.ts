import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeesAndExpensesApiService {

  baseUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) {
  }

  getFees(request:number){
    const url = `${this.baseUrl}/portal-data/request-fees/fees-by-request?requestId=`+request
    return this.httpClient.get(url)
  }

  submitExpenses(body)  {
    const url = `${this.baseUrl}/portal-data/request-fees`
    return this.httpClient.post(url ,  body)
  }

  getRequestById(requestId){
    const url = `${environment.apiUrl}/portal/customer-request/${requestId}`;
    return this.httpClient.get(url);
}
  calculateCharge(requestId, currencyRate){
    const url = `${environment.apiUrl}/portal/customer-request/calculate-charge?requestId=${requestId}&&currencyRate=${currencyRate}`;
    return this.httpClient.get(url);
  }
  getPaidInovice(requestId:number){
    const url = `${environment.apiUrl}/portal-data/request-fees/paidFeesInvoice?requestId=${requestId}`;
    return this.httpClient.get(url);
  }  //33 invoice
  getAcceptTemplateForm(requestId:number){
    const url = `${environment.apiUrl}/portal/customer-request/request-model/${requestId}`;
    return this.httpClient.get(url);
  }


}
