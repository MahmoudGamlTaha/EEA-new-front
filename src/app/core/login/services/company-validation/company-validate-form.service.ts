
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyValidationFormSerivce {
  govList;
  mainModel;

  constructor() {

 
  }

  getCompanyAttachmentByKey(request , fileField) {
    return request?.attachments.find(attachment => attachment.fileField === fileField)
   }

  initForm(companyData?) {
    console.log(companyData);
    
    return this.mainModel = {
      name: {
        label: 'companyValidationForm.name',
        value: companyData?companyData.managerName:'',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      email: {
        type: 'text',
        value: companyData?companyData.email:'',
        col: 'col-md-7 col-12',
        label: 'companyValidationForm.email',
        rules: {
          required: true,
          email:true
        },
      },
      position: {
        label: 'companyValidationForm.position',
        value: '',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },

      comRegisterNum: {
        type: 'number',
        value: companyData?companyData.commercialNumber:'',
        col: 'col-md-2 col-12',
        label: 'companyValidationForm.comRegisterNum',
        rules: {
          required: true,
        },
      },
      COMMERCIAL_NUMBER_PAPER: {
        name: 'COMMERCIAL_NUMBER_PAPER',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          COMMERCIAL_NUMBER_PAPER: {
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'COMMERCIAL_NUMBER_PAPER' ).url : '',
            id: 'COMMERCIAL_NUMBER_PAPER',
            col: 'col-md-4 col-12 ',
            label: companyData ? 'common.download' : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'COMMERCIAL_NUMBER_PAPER' ).validFromDate : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'COMMERCIAL_NUMBER_PAPER' ).validToDate : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },
      nationalId: {
        label: 'companyValidationForm.nationalId',
        value: '',
        col: 'col-md-3 col-12',
        type: 'number',
        rules: {
          required: true,
        },
      },
      NATIONAL_ID: {
        name: 'NATIONAL_ID',
        type: 'input-group',
        col: 'col-md-2 col-12',
        subModel: {
          NATIONAL_ID: {
            type: 'file',
            value: '',
            id: 'NATIONAL_ID',
            col: 'col-md-12 col-12 ',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      taxNumber: {
        type: 'number',
        value: companyData.taxNumber,
        col: 'col-md-2',
        label: 'companyValidationForm.taxId',
        rules: {
          required: true,
        },
      },
      TAX_REGISTER_DOC: {
        name: 'TAX_REGISTER_DOC',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          TAX_REGISTER_DOC: {
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'TAX_REGISTER_DOC' ).url : '',
            id: 'TAX_REGISTER_DOC',
            col: 'col-md-4 col-12 ',
            label: companyData ? 'common.download' : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'TAX_REGISTER_DOC' ).validFromDate : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'TAX_REGISTER_DOC' ).validToDate : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },
    };
  }
}
