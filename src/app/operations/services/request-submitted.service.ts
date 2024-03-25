import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DropDownItem } from '@shared/model/dropDown.model';
import { DynamicTable, TableHeader } from '@shared/model/dynamic-table.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestSubmittedService implements OnInit {
  serviceNameDropDownList: DropDownItem[];
  statusDropDownList: DropDownItem[];
  date;
  tableHeader;
  tableData;
  constructor(private http: HttpClient) {
    this.serviceNameDropDownList = [];
    this.init();
    this.statusDropDownList = [];

    var today = new Date();
    let tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    this.date = {
      startsAt: {
        type: 'date',
        value: this.getDateValue(today),
        col: 'col-6 pb-0',
        label: 'common.from',
      },
      endsAt: {
        type: 'date',
        value: this.getDateValue(tomorrow),
        col: 'col-6 pb-0',
        label: 'common.to',
      },
    };

    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serviceName',
        'tableHeader.orderNumber',
        'tableHeader.orderDate',
        'tableHeader.status',
        'tableHeader.copyOfApproval',
        'tableHeader.modelAutomated',
        'tableHeader.details',
        'tableHeader.orderTracking',
      ],
    };
  }
  init(){
  this.getRequestTypes().subscribe(result=>{
    let types = result['content'];
   // this.serviceNameDropDownList = [];
    types.forEach((res)=>{
      this.serviceNameDropDownList.push({name:res.name});
    });
  
  });
  this.getRequestStatuses().subscribe(result=>{
    let status = result['content'];
    console.log(status);
      status.forEach(element => {
        this.statusDropDownList.push({name:element});
      });
  })
  }
  ngOnInit(): void {
      //alert(88);
  }

  getDateValue(date) {
    var dd = ('0' + date.getDate()).slice(-2);
    var mm = ('0' + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  getCustomerRequests() {
    const url = environment.apiUrl + '/portal/customer-request';
    return this.http.get(url);
  }

  getCustomerRequestById(id) {
    const url = `${environment.apiUrl}/portal/customer-request/${id}`;
    return this.http.get(url);
  }
  getRequestTypes(){
    const url = `${environment.apiUrl}/basic-data/request-type`;
    return this.http.get(url);
  }
  getRequestStatuses(){
    const url = `${environment.apiUrl}/portal-data/request-operation/status-request-list`;
    return this.http.get(url);
  }
}
