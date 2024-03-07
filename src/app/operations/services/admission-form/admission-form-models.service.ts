import { TranslationService } from '../../../language/translation.service';
import { Injectable } from '@angular/core';
import {
  AdmissionFormCompanyDetails,
  DigitalSealModel,
} from '@operations/models/customerForm.model';
import { AdmissionFormService } from './admission-form.service';
import { UtilitiesService } from '@shared/services/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormModelsService {
  currentLang: string;
  digitalSealingModel: DigitalSealModel;
  statusArr;
  statusNote;
  mainNote;
  reviewersList;

  constructor(
    private translationService: TranslationService,
    private admissionFormService: AdmissionFormService,
    private utilsService  :UtilitiesService
  ) {
    this.currentLang = this.translationService.currentLang;
    this.statusArr = [
      { name: 'customer.review', class: 'col-md-4 col-12' },
      { name: 'customer.approval', class: 'col-md-4 col-12' },
      { name: 'customer.rejection', class: 'col-md-4 col-12' },
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

    this.reviewersList = [
      {
        name: 'مصطفي محمد 1',
      },
      {
        name: 'مصطفي محمد 2',
      },
      {
        name: 'مصطفي محمد 3',
      },
      {
        name: 'مصطفي محمد 4',
      },
      {
        name: 'مصطفي محمد 5',
      },
      {
        name: 'مصطفي محمد 6',
      },
    ];


    //Digital Sealing Model
    this.initDigitalSealling();
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
  }
  
initDigitalSealling(request?){
  
   //console.log(request.confirmPayment);
  this.digitalSealingModel = {
    confirmPayment: {
      label: 'admissionForm.rovalOfPayment',
      value: request?request.confirmPayment:false,
      type: 'checkbox',
    },
    confirmAgentExist: {
      label: 'admissionForm.acknowledgmentFromTheAuthorizedPerson',
      value: request?request.confirmAgentExist:false,
      type: 'checkbox',
    },
    confirmHookUsed: {
      label: 'admissionForm.letterFromThePortApprovingTheUseOfTheHook',
      value: request?request.confirmHookUsed:false,
      type: 'checkbox',
    },
  };
return this.digitalSealingModel;
}

  //Main model
  getMainModel(mainModelArrays, request?, inputsList?,userType?) {
    console.log(userType);
     
    let companySelectValues = userType=='customer'?mainModelArrays.ownerCompaniesArr:mainModelArrays.allCompanies;
    
    let model = {
      companyId: {
        label: 'admissionForm.company',
        value: request?.companyId,
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        col: 'col-md-5 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'companyId',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'companyIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: companySelectValues,
        rules: {
          required: true,
        },
      },
      sourceCountryId: {
        label: 'admissionForm.DestinationOfOrigin',
        value: request?.sourceCountryId,
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        col: 'col-md-7 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'sourceCountryId',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'sourceCountryIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.countryArr,
        rules: {
          required: true,
        },
      },
      importHarborId: {
        type: 'select',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        value: request?.importHarborId,
        col: 'col-md-5 col-12 pb-3',
        label: 'admissionForm.portShipmentReceived',
        border: this.admissionFormService.isInputToBeEdited(
          'importHarborId',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'importHarborIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.harborArr,
        rules: {
          required: true,
        },
      },
      shipDate: {
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        type: 'date',
        value: request?.shipDate,
        col: 'col-md-7 col-12 pb-3',
        label: 'admissionForm.dateOfShipment',
        border: this.admissionFormService.isInputToBeEdited(
          'shipDate',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'shipDateChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      landingHarborId: {
        label: 'admissionForm.portAccess',
        value: request?.landingHarborId,
        col: 'col-md-4 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'landingHarborId',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'landingHarborIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.harborArr,
        rules: {
          required: true,
        },
      },
      shipName: {
        type: 'text',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        value: request?.shipName,
        col: 'col-md-4 col-12 pb-3',
        label: 'admissionForm.shipName',
        border: this.admissionFormService.isInputToBeEdited(
          'shipName',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'shipNameChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      arrivedDate: {
        type: 'date',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        value: request?.arrivedDate,
        col: 'col-md-4 col-12 pb-3',
        label: 'admissionForm.dateOfArrivalAtPort',
        border: this.admissionFormService.isInputToBeEdited(
          'arrivedDate',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'arrivedDateChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      weightInTon: {
        type: 'number',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        value: request?.weightInTon,
        col: 'col-md-5 col-12 pb-3',
        label: 'admissionForm.totalShipmentWeight',
        border: this.admissionFormService.isInputToBeEdited(
          'weightInTon',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'weightInTonChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      shipmentWeight: {
        name: 'shipmentWeight',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        type: 'input-group',
        col: 'col-7 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'shipmentWeight',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'shipmentWeightChecker',
          type: 'checkbox',
          value: false,
        },
        subModel: {
          pricePerTon: {
            type: 'number',
            isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
            value: request?.pricePerTon,
            col: this.currentLang === 'ar' ? 'col ps-0' : 'col pe-0',
            label: 'admissionForm.tonPriceByNumbers',
            rules: {
              required: true,
            },
          },
          pricePerTonChar: {
            type: 'text',
            isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
            value: request?.pricePerTonChar,
            col: this.currentLang === 'ar' ? 'col ps-0' : 'col pe-0',
            label: 'admissionForm.tonPriceByWords',
            rules: {
              required: true,
            },
          },
          currencyId: {
            label: 'admissionForm.currency',
            value: request?.currencyId,
            col: this.currentLang === 'ar' ? 'col ps-0' : 'col pe-0',
            type: 'select',
            options: mainModelArrays.currencyArr,
            rules: {
              required: true,
            },
          },
          invoice: {
            type: request !== undefined ? 'download' : 'file',
            value: request?.invoice,
            col: 'col',
            id: 'customerAdmissionFormInvoice',
            label: 'admissionForm.attachInvoice',
            rules: {
              required: true,
            },
          },
        },
      },
      coalTypeId: {
        label: 'admissionForm.coalType',
        value: request?.coalTypeId,
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        col: 'col-md-5 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'coalTypeId',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'coalTypeIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.coalType,
        rules: {
          required: true,
        },
      },
      totalPrice: {
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        type: 'number',
        value: request?.totalPrice,
        col: 'col pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'totalPrice',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.TotalPriceNumber',
        checker: {
          fieldName: 'totalPriceChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      totalPriceInChar: {
        type: 'text',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        value: request?.totalPriceInChar,
        col: 'col pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'totalPriceInChar',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.TotalPriceWords',
        checker: {
          fieldName: 'totalPriceInCharChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      currencyId: {
        label: 'admissionForm.currency',
        value: request?.currencyId,
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        col: 'col pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'currencyId',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        options: mainModelArrays.currencyArr,
        checker: {
          fieldName: 'currencyIdChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      importCoalCompany: {
        type: 'text',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        value: request?.importCoalCompany,
        col: 'col-md-5 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'importCoalCompany',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.coalSupplyingCompany',
        checker: {
          fieldName: 'importCoalCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      unLoadWayId: {
        label: 'admissionForm.unloadingMethod',
        value: request?.unLoadWayId,
        checker: {
          fieldName: 'unLoadWayIdChecker',
          type: 'checkbox',
          value: false,
        },
        col: 'col-md-7 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'unLoadWayId',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        options: mainModelArrays.unloadMethod,
        rules: {
          required: true,
        },
      },
      shipmentStages: {
        type: 'text',
        isDisabled:request?request.status!='CompleteEntry' && request.status !='Created':false,
        value: request?.shipmentStages,
        col: 'col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'shipmentStages',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.shipmentHandlingStages',
        checker: {
          fieldName: 'shipmentStagesChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      UNLOAD_ACCEPT_PAPER: this.getCompanyTypeAndDetails(
        'UNLOAD_ACCEPT_PAPER',
        true,
        mainModelArrays.allCompanies,
        request,
        request !== undefined ? 'UNLOAD_ACCEPT_PAPER' + 0 : 0,
        inputsList
      ),
      STORE_ACCEPT_PAPER: this.getCompanyTypeAndDetails(
        'STORE_ACCEPT_PAPER',
        true,
        mainModelArrays.allCompanies,
        request,
        request !== undefined ? 'STORE_ACCEPT_PAPER' + 2 : 2,
        inputsList
      ),
      TRANSPORT_ACCEPT_PAPER: this.getCompanyTypeAndDetails(
        'TRANSPORT_ACCEPT_PAPER',
        true,
        mainModelArrays.allCompanies,
        request,
        request !== undefined ? 'TRANSPORT_ACCEPT_PAPER' + 4 : 4,
        inputsList
      ),
      STORE_INTERMEDIATE_PAPER: this.getCompanyTypeAndDetails(
        'STORE_INTERMEDIATE_PAPER',
        false,
        mainModelArrays.allCompanies,
        request,
        request !== undefined ? 'STORE_INTERMEDIATE_PAPER' + 6 : 6,
        inputsList
      ),
      HARBOR_LANDING_RIVER: this.getCompanyTypeAndDetails(
        'HARBOR_LANDING_RIVER',
        false,
        mainModelArrays.allCompanies,
        request,
        request !== undefined ? 'HARBOR_LANDING_RIVER' + 10 : 10,
        inputsList
      ),
    };
    console.log(request);
    this.initDigitalSealling(request);
    return model;
  }

  //Document Model
  getDocumentModel(req?) {
    let model = {
      INSURANCE_POLICY: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.INSURANCE_POLICY?.url,
        col: 'col-md col-6',
        label:
          req !== undefined
            ? 'Incurance policy'
            : 'admissionForm.fileAttachment',
        addButtonCol: 'col',
        id: 'INSURANCE_POLICY' + 1,
        requiredDocument: 'admissionForm.billOfLading',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      COMPANY_CONTRACT_COAL: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.COMPANY_CONTRACT_COAL?.url,
        col: 'col-md col-6',
        label:
          req !== undefined
            ? 'Company Contract Coal'
            : 'admissionForm.fileAttachment',
        id: 'COMPANY_CONTRACT_COAL' + 2,
        addButtonCol: 'col',
        requiredDocument: 'admissionForm.partyToWhichCoalIsSupplied',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      SHIP_REGISTRY: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.SHIP_REGISTRY?.url,
        col: 'col-md col-6',
        label:
          req !== undefined ? 'Ship Registry' : 'admissionForm.fileAttachment',
        id: 'SHIP_REGISTRY' + 3,
        addButtonCol: 'col',
        requiredDocument: 'admissionForm.recordingShipmentData',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
    };
    return model;
  }

  //Case Model
  getCaseModel(req?) {
    let model = {
      HOOK_ACCEPT_PAPER: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.HOOK_ACCEPT_PAPER?.url,
        col: 'col-md col-6',
        label:
          req !== undefined
            ? 'Hook Accept Paper'
            : 'admissionForm.fileAttachment',
        id: 'HOOK_ACCEPT_PAPER' + 4,
        addButtonCol: 'col',
        requiredDocument: 'admissionForm.approvingTheUseOfHook',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
    };
    return model;
  }
  //Company Model
  getCompanyTypeAndDetails(
    companyType: string,
    addButton: boolean,
    companies,
    request,
    id,
    inputsList
  ) {
   // console.log(companyType);
   // console.log(request);
    const company: AdmissionFormCompanyDetails = {
      name: companyType,
      type: 'input-group',
      col: 'col-12 pb-3',
      border: this.admissionFormService.isInputToBeEdited(companyType , inputsList) ? 'border border-warning rounded-20 p-2 m-2' : '',
      checker: {
        fieldName: companyType + 'Checker',
        type: 'checkbox',
        
        value: false,
        rules: {
          required: true,
        },
      },
      subModel: {
        companyId: {
          label: 'admissionForm.' + companyType,
          value: request?.requestDetail.find(c => c.companyAcceptance.fileField === companyType).companyId,
          addCompany: true,
          col: 'col-md col-6',
          type: 'select',
          options: companies,
          rules: {
            required: true,
          },
        },
        companyAcceptance: {
          type: request !== undefined && !this.admissionFormService.isInputToBeEdited(companyType , inputsList)? 'download' : 'file',
          value: request && !this.admissionFormService.isInputToBeEdited(companyType , inputsList) ? this.admissionFormService.getCompanyDetailsByType(request , companyType)['companyAcceptance']['url']: '',
          col: 'col-md col-6',
          label: request !== undefined && !this.admissionFormService.isInputToBeEdited(companyType , inputsList) ?'DownLoad Company Acceptance':'admissionForm.companyAcceptance',
          id: id,
          rules: {
            required: true,
          },
        },
        companyAcceptanceNumber: {
          type: 'number',
          value: request? this.admissionFormService.getCompanyDetailsByType(request , companyType)['companyAcceptanceNumber']:'',
          col: 'col-md col-6',
          label: 'admissionForm.companyEnvironmentalApprovalNumber',
          rules: {
            required: true,
          },
        },
        acceptDate: {
          type: 'date',
          value: request?  this.utilsService.convertDate(this.admissionFormService.getCompanyDetailsByType(request , companyType)['acceptDate']):'',
          col: 'col-md col-6',
          label: 'admissionForm.acceptanceData',
          rules: {
            required: true,
          },
        },
        otherAttachment: {
          type:  request !== undefined && !this.admissionFormService.isInputToBeEdited(companyType , inputsList)? 'download' : 'file',
          value: request && !this.admissionFormService.isInputToBeEdited(companyType , inputsList) ? this.admissionFormService.getCompanyDetailsByType(request , companyType).otherAttachment?.[0]?[0]['url']:'':'',
          col: 'col-md col-6',
          label:  request !== undefined && !this.admissionFormService.isInputToBeEdited(companyType , inputsList) ?'DownLoad Attachment':'admissionForm.fileAttachment',
          addButton: addButton,
          id: id + 1,
          addButtonCol: 'col',
          rules: {
            required: true,
          },
        },
        id: {
          value: request ? this.admissionFormService.getCompanyDetailsByType(request, companyType)['id'] : 0,
          col: 'invisible',
          type: 'number',
          rules: {
            required: false,
          },
          label: ''
        },
      },
    };
    return company;
  }
}
