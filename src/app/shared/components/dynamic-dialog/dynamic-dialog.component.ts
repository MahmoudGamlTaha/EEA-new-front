import { AdminUtilitiesService } from '@admin/services/admin-utils.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogService } from '@shared/services/dialog.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'app/language/translation.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  providers: [DialogService, AdminUtilitiesService],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    DynamicFormComponent,
    TranslateModule,
  ],
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
})
export class DynamicDialogComponent {
  @ViewChild('dynamicForm') dynamicForm!: ElementRef;
  baseUrl = environment.apiUrl;
  options;
  formDataModel;
  tableData;
  formData;
  gridData;
  currentLang;
  companyForm;
  companyAttachments = [];
  count = new BehaviorSubject(0);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    dialogService: DialogService,
    ts: TranslationService,
    private dialogRef: MatDialogRef<DynamicDialogComponent>,
    private httpClient: HttpClient,
    private utilitiesApiService: UtilitiesApiService,
    private auth:AuthService
  ) {
    this.options = dialogService.dialogOptions.find(
      (option) => option.type === data.option
    );

    if (
      data.option == 'add' ||
      data.option == 'edit' ||
      data.option == 'addNewCompany'
    ) {
      console.log('dialog', data);
      this.formDataModel = data.selectedForm;
    }

    if (data.option == 'digitalSealingSuccess') {
      this.gridData = true;
    }
    this.currentLang = ts.currentLang;
  }

  getCompanyForm(form) {
    this.companyForm = form;
    this.uploadFile(form.Accept_Company, 'Accept_Company');
    this.uploadFile(form.ACCEPT_EEA, 'ACCEPT_EEA');
    
  }

  uploadFile(file, key) {
    let formData = new FormData();
    formData.append('files', file, file.name);
    this.utilitiesApiService.uploadFile(formData).subscribe((res) => {
      console.log(this.companyForm['validFromDate'])
      console.log(res['content'])
      if (key === 'ACCEPT_EEA') {
        this.companyAttachments.push({
          fileField: 'ACCEPT_EEA',
          id: res['content'][0]['id'],
          validFromDate: this.companyForm['validFromDate'],
          validToDate: this.companyForm['validToDate']
        });
        delete this.companyForm['ACCEPT_EEA'];
        delete this.companyForm['validFromDate'];
        delete this.companyForm['validToDate'];
        this.count.next(this.companyAttachments.length);
      } else if (key === 'Accept_Company') {
        this.companyAttachments.push({
          fileField: 'Accept_Company',
          id: res['content'][0]['id'],
        });
        delete this.companyForm['Accept_Company'];
        this.count.next(this.companyAttachments.length);
      }
    }
    
    );
  }

  addCompany(form, action) {
    let apiUrl = `${this.baseUrl}/portal-data/company`;
    this.getCompanyForm(form);
    this.count.subscribe(res=>{
      if(res===2){
        console.log(form)
        this.companyForm={
          ...this.companyForm,
          attachments:this.companyAttachments
        }
        let formToSend = {
          ...this.companyForm,
          userId: this.auth.user.sub.id, // login user who make action
          commercialNumber: null,
          importCardNumber:null,
          taxNumber: null,
          industryNumber: null,
          ownerId: null, // owner user
          phoneNumber: null,
          cityCode: null,
          govId: null,
          email: null,
          managerName: null,
          quotaValidFrom: null,
          quotaValidTo: null,
          quota: null,
          purpose: null,
          address: null,
          renewPermitStatus: null,
          companyTypeId: null
        };
        return this.httpClient.post(apiUrl, formToSend).subscribe((res) => {
          this.dialogRef.close({ action: action, data: res['content'] });
          window.location.reload();
        });
      }
    })
   
   
  }

  getFormValues(values) {
    this.formData = values;
  }

  excuteAction(action) {
    switch (action) {
      case 'add':
        if (this.formData !== undefined) {
          this.dialogRef.close({ action: action, data: this.formData });
        }
        break;
      case 'addCompany':
        let form = this.dynamicForm['dynamicFormGroup'].value;
        this.addCompany(form, action);
        break;
      case 'edit':
        this.dialogRef.close({ action: action, data: this.formData });
        break;
      case 'delete':
        this.dialogRef.close({ action: action });
        break;
      case 'dismiss':
        this.dialogRef.close({ action: action });
        break;
      default:
        this.dialogRef.close({ action: action });
        break;
    }
  }
}
