import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DropDownItem } from '@shared/model/dropDown.model';
import { DynamicTable, TableHeader } from '@shared/model/dynamic-table.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestSubmittedService {
  serviceNameDropDownList: DropDownItem[];
  statusDropDownList: DropDownItem[];
  date;
  tableHeader;
  tableData;
  constructor(private http: HttpClient) {
    this.serviceNameDropDownList = [
      {
        name: 'Category 1',
      },
      {
        name: 'Category 2',
      },
      
    ];
    this.statusDropDownList = [
      {
        name: 'Category 1',
      },
      {
        name: 'Category 2',
      },
      {
        name: 'Category 3',
      },
      {
        name: 'Category 4',
      },
      {
        name: 'Category 5',
      },
      {
        name: 'Category 6',
      },
    ];

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
}
