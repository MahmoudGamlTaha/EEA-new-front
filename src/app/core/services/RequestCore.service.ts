import { Injectable } from '@angular/core'


@Injectable({
  providedIn: 'root'
})
export class RequestCoreService {
 customerRequest;
 currentUser;
 customerRequestId;
 customerRequestStatus;
 requestype;
 loggerList;
 setCustomerRequestStatus(status:any){
    this.customerRequestStatus = status;
    sessionStorage.setItem("status", this.customerRequestStatus);
 }
 getCustomerRequestStatus():any{
    return this.customerRequestStatus?this.customerRequestStatus : sessionStorage.getItem("status");
 }
 setCurrentCustomerRequestId(requestId:number){
    this.customerRequestId = requestId;
    sessionStorage.setItem("requestId", this.customerRequestId);
 }
 getCurrentCustomerRequestId(){
    return  sessionStorage.getItem("requestId");
 }
 setLoggerList(loggerList){
    alert(40);
    this.loggerList = loggerList;
    sessionStorage.removeItem("loggerList");
    sessionStorage.setItem("loggerList",  JSON.stringify(loggerList));
 }
 getLoggerList(){
    alert(50);
    return sessionStorage.getItem("loggerList");
 }
};