import { Injectable } from '@angular/core';
import {
  NotificationCard,
  PaymentDetailsCard,
} from '@shared/model/card-data.model';
import { DropDownItem } from '@shared/model/dropDown.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentOfFeesService {
  dropDownList: DropDownItem[];
  notificationCards: NotificationCard[];
  // paymentDetails:PaymentDetailsCard[];
  paymentDetailsForm;
  constructor() {
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

    this.notificationCards = [
      {
        title: 'customer.requestingCoalShipments',
        applicationNumber: 3225,
        office: 'customer.environmentalProtectionFund',
        acceptanceStatus: 'pleasePayTheFees',
        orderDate: 'On Saturday,17/9/2022',
      },
    ];

    this.paymentDetailsForm = {
      informationAboutPaymentMethods: {
        type: 'textArea',
        value: '',
        col: 'col-md-6 col-12 my-5',
        label: 'customer.informationAboutPaymentMethods',
        checker: false,
        rules: {
          required: true,
        },
      },
    };
  }

  getPaymentDetails(req) {
    let paymentDetails: PaymentDetailsCard[] = [
      {
        name: 'customer.orderNumber',
        value: req.id,
      },
      {
        name: 'tableHeader.orderDate',
        value: req.arrivedDate,
      },
      {
        name: 'customer.serviceName',
        value: req.name,
      },
      {
        name: 'customer.feeValue',
        value: req.totalPrice,
      },
    ];
    return paymentDetails;
  }
}
