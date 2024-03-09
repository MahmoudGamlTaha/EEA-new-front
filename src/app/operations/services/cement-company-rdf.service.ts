import { Injectable } from '@angular/core';
import { flip } from '@popperjs/core';
import { UtilitiesService } from '@shared/services/utilities.service';
import { AuthService } from 'app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CementCompanyRdfService {
  // invoiceData = {};
  invoiceData;
  totalNumberOfKeys = 0;
  totalRdf;
  wastePercentage;
  digitalSealingModel;
  statusNote;
  mainNote;
  reviewersList;
  statusArr;
  utilService;

  constructor(utilService:UtilitiesService,  private auth: AuthService) {
    this.utilService = utilService;
    this.initForm(null,null,null);
  }


initForm(data , formType, rdf) {
  console.log(rdf);
  console.log(data);
  this.invoiceData= {
    invoices:{
    name: 'invoiceData',
    type: 'input-group',
    col: 'col-12',
    checker: {
      fieldName: 'invoicesChecker',
      type: 'checkbox',
      value: formType=='check' || formType =='view-only'?true:false,
    },
    subModel: {
      weightInTon: {
        isDisabled:true ,
        type: 'number',
        value: rdf?.weightInTon,
        col: 'col-md-3',
        label: 'customer.quantityRdfTons',
        rules: {
          required: true,
        },
      
      },
      invoices: {
        type: rdf?.invoices[0]?'download':'file',
        value: rdf?.invoices[0].url,
        col: 'col-md-3',
        id:'invoices 1',
        label: 'customer.invoiceAttachement',
        rules: {
          required: true,
        }
      },

      date: {
        isDisabled:data?data.status!='CompleteEntry' && data.status !='Created'?true:data.requester:false,
        type: 'date',
        value: this.utilService.convertDate(rdf?.createdDate),
        col: 'col-md-3',
        label: 'customer.date',
        rules: {
          required: true,
        },
      },
      providerName: {
        isDisabled:data?data.status!='CompleteEntry' && data.status !='Created':false,
        type: 'string',
        value: rdf?.providerName,
        col: 'col-md-3',
        label: 'customer.supplierName',
        rules: {
          required: true,
        },
      },
    }}
  };
  this.totalRdf = {
    totalWeightInTon: {
      isDisabled:data?data.status!='CompleteEntry' && data.status !='Created':false,
      type: 'number',
      value: rdf?.totalWeightInTon,
      col: 'col-md-6 col-12',
      label: 'customer.totalRdf',
      checker: {
        fieldName: 'totalWeightInTonChecker',
        type: 'checkbox',
        value: false,
      },
      rules: {
        required: true,
      },
    },
  };
  this.wastePercentage= {
    wastePercentage:{
    name: 'wastePercentage',
    type: 'input-group',
    label: 'customer.cementCompanyPositionUseWasteFuel',
    checker: {
      fieldName: 'wastePercentageChecker',
      type: 'checkbox',
      value: false,
    },
    subModel: {
      wastePercentage: {
        value: 'wastePercentage',
        type: 'radio',
        labelCol: 'col-md-6 col-12',
        isDisabled:data?data.status!='CompleteEntry' && data.status !='Created':false,
        options: [
          {
            label: 'customer.greaterThanOrEqual',
            value: rdf?.includeEnergyReject==true?'wastePercentage':false,
            
          },
          {
            label: 'customer.lessThan',
            value: rdf?.includeEnergyReject==true?false:'wastePercentage',
          },
        ],
        rules: {
          required: true,
        },
      },
    }}
  };
  this.digitalSealingModel = {
    companyConfirm: {
      isDisable:data?data.status!='CompleteEntry' && data.status !='Created':false,
      label: 'customer.percentageUsedOfFuelExtractedFromRDFWaste',
      value:rdf?rdf.includeEnergyReject:false,
      type: 'checkbox',
    },
  };
  this.mainNote = {
    mainNote: {
      type: 'textArea',
      value:
        'بعد المراجعة الفنية لشحنة الفحم المقدم بشأنها الطلب فانه سوف يتم خصم 25طن من الكوتة الخاصة بالشركة',
      col: 'col-md-8 col-12 my-4',
      rules: {
        required: true,
      },
    },
  };
  this.reviewersList = [
    {
      name: 'مصطفي محمد 1',
    },
    {
      name: 'مصطفي محمد 2',
    },
  
  ];
  this.statusNote = {
    statusNote: {
      type: 'textArea',
      value:
        'بعد المراجعة الفنية للطلب المقدم بشأن تفريغ الشحنة المطلوبة تم التأكد من جميع البيانات والمرفقات المطلوبة',
      col: 'col-12',
      rules: {
        required: true,
      },
    },
  };
  this.statusArr = [
    { name: 'customer.review', class: 'col-md-4 col-12' },
    { name: 'customer.approval', class: 'col-md-4 col-12' },
    { name: 'customer.rejection', class: 'col-md-4 col-12' },
  ];
}
onAddingInvoice() {
  console.log(112);
    this.invoiceData['invoiceData' + this.totalNumberOfKeys] = {
      
        attachInvoice: {
          type: 'file',
          value: '',
          col: 'col-md-3',
          label: 'customer.invoiceAttachement',
          rules: {
            required: true,
          },
        },
        
      }
    return this.invoiceData;
  }






  // onAddingInvoice() {
  //   this.totalNumberOfKeys += 1;
  //   this.invoiceData['invoiceData' + this.totalNumberOfKeys] = {
  //     name: 'invoiceData' + this.totalNumberOfKeys,
  //     type: 'input-group',
  //     col: 'col-12',
  //     subModel: {
  //       quantityRdfTons: {
  //         type: 'number',
  //         value: '',
  //         col: 'col-md-3',
  //         label: 'customer.quantityRdfTons',
  //         rules: {
  //           required: true,
  //         },
  //       },
  //       attachInvoice: {
  //         type: 'file',
  //         value: '',
  //         col: 'col-md-3',
  //         label: 'customer.invoiceAttachement',
  //         rules: {
  //           required: true,
  //         },
  //       },
  //       date: {
  //         type: 'date',
  //         value: '',
  //         col: 'col-md-3',
  //         label: 'customer.date',
  //         rules: {
  //           required: true,
  //         },
  //       },
  //       supplierName: {
  //         type: 'string',
  //         value: '',
  //         col: 'col-md-3',
  //         label: 'customer.supplierName',
  //         rules: {
  //           required: true,
  //         },
  //       },
  //     },
  //   };
  //   return this.invoiceData;
  // }
}
