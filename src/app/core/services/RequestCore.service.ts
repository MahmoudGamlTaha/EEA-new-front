import { Injectable } from '@angular/core'


@Injectable({
  providedIn: 'root'
})
export class RequestCoreService {
 customerRequest;
 currentUser;
 customerRequestId;
 customerRequestStatus;

 setCustomerRequestStatus(status:any){
    this.customerRequestStatus = status;
    sessionStorage.setItem("status", this.customerRequestStatus);
 }
 getCustomerRequestStatus():any{
    return this.customerRequestStatus?this.customerRequestStatus : sessionStorage.getItem("status");
 }
};