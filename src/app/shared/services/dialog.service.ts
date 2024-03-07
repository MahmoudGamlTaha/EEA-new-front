import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogOptions } from '@shared/model/dialog.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  baseUrl: string;
  comapnyActivities;
  dialogOptions: DialogOptions[] = [
    {
      type: 'add',
      title: 'common.add',
      buttons: [
        {
          btnName: 'common.add',
          btnCss: 'btn gradient col-auto',
          action: 'add',
        },
        {
          btnName: 'common.cancel',
          btnCss: 'btn btn-secondary col-auto',
          action: 'dismiss',
        },
      ],
    },
    {
      type: 'edit',
      title: 'common.edit',
      buttons: [
        {
          btnName: 'common.edit',
          btnCss: 'btn gradient col-auto',
          action: 'edit',
        },
        {
          btnName: 'common.cancel',
          btnCss: 'btn btn-secondary col-auto',
          action: 'dismiss',
        },
      ],
    },
    {
      type: 'delete',
      title: 'common.delete',
      message: 'common.areYouSureToDelete',
      buttons: [
        {
          btnName: 'common.delete',
          btnCss: 'btn btn-danger col-auto',
          action: 'delete',
        },
        {
          btnName: 'common.cancel',
          btnCss: 'btn btn-secondary col-auto',
          action: 'dismiss',
        },
      ],
    },
    {
      type: 'digitalSealingSuccess',
      title: 'common.done',
      buttons: [
        {
          btnName: 'common.done',
          btnCss: 'btn gradient col-auto',
          action: 'dismiss',
        },
      ],
    },
    {
      type: 'addNewCompany',
      title: 'customer.addCompany',
      buttons: [
        {
          btnName: 'common.add',
          btnCss: 'btn gradient col-auto',
          action: 'addCompany',
        },
        {
          btnName: 'common.cancel',
          btnCss: 'btn btn-secondary col-auto',
          action: 'dismiss',
        },
      ],
    },
  ];
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  

  getAddCompanyModel(companyActivities) {
    let addCompanyModel = {
      name: {
        type: 'text',
        value: '',
        col: 'col-6',
        label: 'customer.companyName',
        rules: {
          required: true,
        },
      },
      ACCEPT_EEA: {
        type: 'file',
        value: '',
        col: 'col-6',
        label: 'admissionForm.companyAcceptance',
        id:'ACCEPT_EEA'+1,
        rules: {
          required: true,
        },
      },
      acceptEEANumber: {
        type: 'number',
        value: '',
        col: 'col-3',
        label: 'admissionForm.companyEnvironmentalApprovalNumber',
        rules: {
          required: true,
        },
      },
      Accept_Company: {
        type: 'file',
        value: '',
        col: 'col-3',
        label: 'companyValidationForm.attach',
        id:'attach'+1,
        rules: {
          required: true,
        },
      },
      validFromDate: {
        type: 'date',
        value: '',
        col: 'col-3',
        label: 'common.from',
        rules: {
          required: true,
        },
      },
      validToDate: {
        type: 'date',
        value: '',
        col: 'col-3',
        label: 'common.to',
        rules: {
          required: true,
        },
      },
      activityId: {
        type: 'select',
        value: '',
        col: 'col-12',
        label: 'customer.companyActivity',
        options: companyActivities,
        rules: {
          required: true,
        },
      },
    };

    return addCompanyModel;
  }

  getCompanyActivity() {
    const url = this.baseUrl + '/basic-data/company-activity';
    return this.http.get(url);
  }
}
