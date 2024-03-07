import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerRegisterationAPIService {

  registerUrl = `${environment.apiUrl}/portal-data/customer`

  constructor(private httpClient: HttpClient) {
  }

   registerCustomerAPI(registerRequest) {
    return this.httpClient.post(this.registerUrl , registerRequest)
  }
}
