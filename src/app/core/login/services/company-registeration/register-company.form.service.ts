import { CompanyType } from '@shared/model/company-type';
import { Injectable } from '@angular/core';
import { ActivityType } from '@shared/model/activity-type';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanyFormSerivce {
  govList;
  mainModel;
  companyTypes: CompanyType[]
  activityTypes: ActivityType[]

  constructor() {
   
  }

  getCompanyAttachmentByKey(request , fileField) {
    return request?.attachments.find(attachment => attachment.fileField === fileField)
   }

  initForm(companyData?) {
    console.log(companyData);
    
    this.mainModel = {
      name: {
        label: 'companyRegistrationForm.companyName',
        value: companyData ? companyData['name'] : '',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      managerName: {
        type: 'text',
        value: companyData ? companyData['managerName'] : '',
        col: 'col-md-7 col-12',
        label: 'companyRegistrationForm.managerName',
        rules: {
          required: true,
        },
      },
      companyTypeId: {
        label: 'companyRegistrationForm.companyType',
        value: companyData ? companyData['companyTypeId'] : '',
        col: 'col-md-5 col-12',
        type: 'select',
        options: this.companyTypes,
        rules: {
          required: true,
        },
      },
      commercialNumber: {
        type: 'number',
        value: companyData ? companyData['commercialNumber'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.comRegisterNum',
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
            id:'COMMERCIAL_NUMBER_PAPER',
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'COMMERCIAL_NUMBER_PAPER' ).url : '',
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

      activityId: {
        label: 'companyRegistrationForm.companyActivityType',
        value: companyData ? companyData['activityId'] : '',
        col: 'col-md-5 col-12',
        type: 'select',
        options: this.activityTypes,
        rules: {
          required: true,
        },
      },
      taxNumber: {
        type: 'number',
        value: companyData ? companyData['taxNumber'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.taxRegisterNum',
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
            id:'TAX_REGISTER_DOC',
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'TAX_REGISTER_DOC' ).url : '',
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
      purpose: {
        type: 'text',
        value: companyData ? companyData['purpose'] : '',
        col: 'col-md-5 col-12',
        label: 'companyRegistrationForm.reasonOfUsage',
        rules: {
          required: true,
        },
      },
      industryNumber: {
        type: 'number',
        value: companyData ? companyData['industryNumber'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.industrialRegisterNum',
        rules: {
          required: true,
        },
      },
      INDUSTRIAL_REGISTER_DOC: {
        name: 'INDUSTRIAL_REGISTER_DOC',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          INDUSTRIAL_REGISTER_DOC: {
            id:'INDUSTRIAL_REGISTER_DOC',
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'INDUSTRIAL_REGISTER_DOC' ).url : '',
            col: 'col-md-4 col-12 ',
            label: companyData ? 'common.download' : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'INDUSTRIAL_REGISTER_DOC' ).validFromDate : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'INDUSTRIAL_REGISTER_DOC' ).validToDate : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },
      address: {
        type: 'text',
        value: companyData ? companyData['address'] : '',
        col: 'col-md-3 col-12',
        label: 'companyRegistrationForm.companyAddress',
        rules: {
          required: true,
        },
      },
      govId: {
        label: 'companyRegistrationForm.gov',
        value: companyData ? companyData['govId'] : '',
        col: 'col-md-2 col-12',
        type: 'select',
        options: this.govList,
        rules: {
          required: true,
        },
      },
      acceptEEANumber: {
        label: 'companyRegistrationForm.envApprovalNum',
        value: companyData ? companyData['acceptEEANumber'] : '',
        col: 'col-md-2 col-12',
        type: 'number',
        rules: {
          required: true,
        },
      },
      ACCEPT_EEA: {
        name: 'ACCEPT_EEA',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          from: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'ACCEPT_EEA' ).validFromDate : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'ACCEPT_EEA' ).validToDate : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          ACCEPT_EEA: {
            id:'ACCEPT_EEA',
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'ACCEPT_EEA' ).url : '',
            col: 'col-md-4 col-12 ',
            label: companyData ? 'common.download' : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      phoneNumber: {
        type: 'text',
        value: companyData ? companyData['phoneNumber'] : '',
        col: 'col-md-3 col-12',
        label: 'companyRegistrationForm.companyPhone',
        rules: {
          required: true,
        },
      },
      cityCode: {
        label: 'code',
        value: companyData ? companyData['cityCode'] : '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      renewPermitStatus: {
        label: 'companyRegistrationForm.permitRenewalPosition',
        value: companyData ? companyData['renewPermitStatus'] : '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      RENEW_PERMIT_DOC: {
        name: 'RENEW_PERMIT_DOC',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          from: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'RENEW_PERMIT_DOC' ).validFromDate : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'RENEW_PERMIT_DOC' ).validToDate : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          RENEW_PERMIT_DOC: {
            id:'RENEW_PERMIT_DOC',
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'RENEW_PERMIT_DOC' ).url : '',
            col: 'col-md-4 col-12 ',
            label: companyData ? 'common.download' : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      email: {
        type: 'text',
        value: companyData ? companyData['email'] : '',
        col: 'col-md-5 col-12',
        label: 'companyRegistrationForm.companyEmail',
        rules: {
          required: true,
          email:true
        },
      },
      quota: {
        type: 'text',
        value: companyData ? companyData['quota'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.companyQuota',
        rules: {
          required: true,
        },
      },
      quotaValidFrom: {
        type: 'date',
        value: companyData ? companyData['quotaValidFrom'] : '',
        col: 'col-md-2 col-12',
        label: 'common.from',
        rules: {
          required: true,
        },
      },
      quotaValidTo: {
        type: 'date',
        value: companyData ? companyData['quotaValidTo'] : '',
        col: 'col-md-2 col-12',
        label: 'common.to',
        rules: {
          required: true,
        },
      },
    };

    return this.mainModel
  }

  setGovList(list) {
    this.govList = list 
  }
  setCompanyTypeList(list) {
    this.companyTypes = list 
  }
  setActivityTypeList(list) {
    this.activityTypes = list 
  }
}
