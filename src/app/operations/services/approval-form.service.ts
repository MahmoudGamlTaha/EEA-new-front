import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApprovalFormService {
  shipmentInfoForm;
  approvalIntroForm;
  approvalTermsForm;
  constructor() {
    this.approvalIntroForm = {
      greetings: {
        type: 'text',
        value: '',
        col: 'col-md-5 col-12  pb-3',
        label: 'approvalIntroForm.greetings',
        labelCol: 'col-md-6 col',
        rules: {
          required: true,
        },
      },
      greetings2: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible text-center',
        label: 'approvalIntroForm.greetings2',
        labelCol: 'col-md-4 col',
        rules: {
          required: true,
        },
      },
      inCorpWithEeaa: {
        type: 'text',
        value: '',
        col: 'col-md-11 col-12 pb-3',
        label: 'approvalIntroForm.inCorpWithEeaa',
        labelCol: 'col-md-8 col',
        rules: {
          required: true,
        },
      },
      toEeaa: {
        type: 'date',
        value: '',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalIntroForm.toEeaa',
        labelCol: 'col-md-5 col',
        rules: {
          required: true,
        },
      },
      carryOutShipment: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'approvalIntroForm.carryOutShipment',
        labelCol: 'col-md-6 col',
        rules: {
          required: true,
        },
      },
      carriedBy: {
        type: 'text',
        value: '',
        col: 'col-md-4 col-12 pb-3',
        label: 'approvalIntroForm.carriedBy',
        labelCol: 'col-md-4 col',
        rules: {
          required: true,
        },
      },
      arrivingTo: {
        type: 'text',
        value: '',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalIntroForm.arrivingTo',
        labelCol: 'col-md-6 col',
        rules: {
          required: true,
        },
      },
      arrivingDate: {
        type: 'date',
        value: '',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalIntroForm.arrivingDate',
        labelCol: 'col-md-2 col',
        rules: {
          required: true,
        },
      },
    };
    this.shipmentInfoForm = {
      shipmentReceivedFrom: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.shipmentReceivedFrom',
        rules: {
          required: true,
        },
      },
      importingBeneficial: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.importingBeneficial',
        rules: {
          required: true,
        },
      },
      dateOfImport: {
        type: 'date',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.dateOfImport',
        rules: {
          required: true,
        },
      },
      companyResponsibleForCarryOut: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.companyResponsibleForCarryOut',
        rules: {
          required: true,
        },
      },
      companyResponsibleForCarryOut2: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.companyResponsibleForCarryOut',
        rules: {
          required: true,
        },
      },
      harbor: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.harbor',
        rules: {
          required: true,
        },
      },
      shipName: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.shipName',
        rules: {
          required: true,
        },
      },
      wayOfCarryOut: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.wayOfCarryOut',
        rules: {
          required: true,
        },
      },
      totalTons: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.totalTons',
        rules: {
          required: true,
        },
      },
      arrivalDate: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.arrivalDate',
        rules: {
          required: true,
        },
      },
      coalType: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.coalType',
        rules: {
          required: true,
        },
      },
    };
    this.approvalTermsForm = {
      label1: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible',
        label: 'approvalTermsForm.label1',
        labelCol: 'col-md-12 col',
        rules: {
          required: true,
        },
      },
      noIssueFor: {
        type: 'text',
        value: '',
        col: 'col-md-7 col-12 pb-3',
        label: 'approvalTermsForm.noIssueFor',
        labelCol: 'col-md-7 col',
        rules: {
          required: true,
        },
      },
      carryingOutShipment: {
        type: 'text',
        value: '',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalTermsForm.carryingOutShipment',
        labelCol: 'col-md-5 col',
        rules: {
          required: true,
        },
      },
      toBeUsedFor: {
        type: 'text',
        value: '',
        col: 'col-md-4 col-12 pb-3',
        label: 'approvalTermsForm.toBeUsedFor',
        labelCol: 'col-md-4 col',
        rules: {
          required: true,
        },
      },
      by: {
        type: 'text',
        value: '',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalTermsForm.by',
        labelCol: 'col-md-5 col',
        rules: {
          required: true,
        },
      },
      harbor: {
        type: 'text',
        value: '',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalTermsForm.harbor',
        labelCol: 'col-md-2 col',
        rules: {
          required: true,
        },
      },
      thus: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3',
        label: 'approvalTermsForm.thus',
        labelCol: 'col-md-1 col',
        rules: {
          required: true,
        },
      },
      harborManagementTo: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'approvalTermsForm.harborManagementTo',
        labelCol: 'col-md-6 col',
        rules: {
          required: true,
        },
      },
      byCompany: {
        type: 'text',
        value: '',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalTermsForm.byCompany',
        labelCol: 'col-md-3 col',
        rules: {
          required: true,
        },
      },
      byCompany2: {
        type: 'text',
        value: '',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalTermsForm.byCompany',
        labelCol: 'col-md-3 col',
        rules: {
          required: true,
        },
      },
      label2: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible',
        label: 'approvalTermsForm.label2',
        labelCol: 'col-md-12 col',
        rules: {
          required: true,
        },
      },
      notedThat: {
        type: 'date',
        value: '',
        col: 'col-md-10 col-12 pb-3',
        label: 'approvalTermsForm.notedThat',
        labelCol: 'col-md-8 col',
        rules: {
          required: true,
        },
      },
      allPaymentsDone: {
        type: 'date',
        value: '',
        col: 'col-md-10 col-12 pb-3',
        label: 'approvalTermsForm.allPaymentsDone',
        labelCol: 'col-md-8 col',
        rules: {
          required: true,
        },
      },
      labelEnd: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible',
        label: 'approvalTermsForm.labelEnd',
        labelCol: 'col-md-12 col',
        rules: {
          required: true,
        },
      },
    };
  }
}
