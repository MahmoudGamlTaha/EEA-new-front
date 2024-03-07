import { CompanyType } from '@shared/model/company-type';
import { Injectable } from '@angular/core';
import { ActivityType } from '@shared/model/activity-type';

@Injectable({
  providedIn: 'root',
})
export class EditCompanyFormSerivce {
  govList;
  mainModel;
  companyTypes: CompanyType[]
  activityTypes: ActivityType[]

  constructor() {
   
  }

  initForm() {
    this.mainModel = {
      name: {
        label: 'companyRegistrationForm.companyName',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      managerName: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12',
        label: 'companyRegistrationForm.managerName',
        rules: {
          required: true,
        },
      },
      companyTypeId: {
        label: 'companyRegistrationForm.companyType',
        value: '',
        col: 'col-md-6 col-12',
        type: 'select',
        options: this.companyTypes,
        rules: {
          required: true,
        },
      },
      commercialNumber: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.comRegisterNum',
        rules: {
          required: true,
        },
      },
      COMMERCIAL_NUMBER_PAPER: {
        name: 'COMMERCIAL_NUMBER_PAPER',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          COMMERCIAL_NUMBER_PAPER: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12 ',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
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
        value: '',
        col: 'col-md-6 col-12',
        type: 'select',
        options: this.activityTypes,
        rules: {
          required: true,
        },
      },
      taxNumber: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.taxRegisterNum',
        rules: {
          required: true,
        },
      },

      TAX_REGISTER_DOC: {
        name: 'TAX_REGISTER_DOC',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          TAX_REGISTER_DOC: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12 ',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
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
        value: '',
        col: 'col-md-6 col-12',
        label: 'companyRegistrationForm.reasonOfUsage',
        rules: {
          required: true,
        },
      },
      industryNumber: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.industrialRegisterNum',
        rules: {
          required: true,
        },
      },
      INDUSTRIAL_REGISTER_DOC: {
        name: 'INDUSTRIAL_REGISTER_DOC',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          INDUSTRIAL_REGISTER_DOC: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12 ',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
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
        value: '',
        col: 'col-md-4 col-12',
        label: 'companyRegistrationForm.companyAddress',
        rules: {
          required: true,
        },
      },
      govId: {
        label: 'companyRegistrationForm.gov',
        value: '',
        col: 'col-md-2 col-12',
        type: 'select',
        options: this.govList,
        rules: {
          required: true,
        },
      },
      acceptEEANumber: {
        label: 'companyRegistrationForm.envApprovalNum',
        value: '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      ACCEPT_EEA: {
        name: 'ACCEPT_EEA',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          ACCEPT_EEA: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      phoneNumber: {
        type: 'text',
        value: '',
        col: 'col-md-4 col-12',
        label: 'companyRegistrationForm.companyPhone',
        rules: {
          required: true,
        },
      },
      cityCode: {
        label: 'code',
        value: '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      renewPermitStatus: {
        label: 'companyRegistrationForm.permitRenewalPosition',
        value: '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      RENEW_PERMIT_DOC: {
        name: 'RENEW_PERMIT_DOC',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          RENEW_PERMIT_DOC: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      email: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12',
        label: 'companyRegistrationForm.companyEmail',
        rules: {
          required: true,
        },
      },
      quota: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.companyQuota',
        rules: {
          required: true,
        },
      },
      quotaValidFrom: {
        type: 'date',
        value: '',
        col: 'col-md-2 col-12',
        label: 'common.from',
        rules: {
          required: true,
        },
      },
      quotaValidTo: {
        type: 'date',
        value: '',
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
