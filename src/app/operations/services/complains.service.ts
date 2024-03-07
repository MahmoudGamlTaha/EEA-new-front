import { AuthService } from 'app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComplainsForm } from '@operations/models/customerForm.model';
import { DropDownItem } from '@shared/model/dropDown.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplainsService {
  baseUrl: string;
  dropDownList: DropDownItem[];
  formModel: ComplainsForm;
  constructor(private http: HttpClient , private auth : AuthService) {
    this.baseUrl = environment.apiUrl;
    this.dropDownList = [
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

    this.formModel = {
      complaint: {
        type: 'textArea',
        value: '',
        col: 'col-md-8 col-12 my-4',
        label: 'customer.AddYourComplaintAndItWillBeAnswered',
        rules: {
          required: true,
        },
      },
      responsesToPreviousInquiries: {
        type: 'textArea',
        value: '',
        col: 'col-12 my-4',
        label: 'customer.responsesToPreviousInquiries',
        rules: {
          required: true,
        },
      },
    };
  }

  sendingComplains(form) {
    let complainsObj = {
      ...form,
      requesterId: this.auth.user['sub'].id,
      replies: null,
      requestHeaderId: null,
    };
    const url = this.baseUrl + '/portal-data/complain';
    return this.http.post(url, complainsObj);
  }
}
