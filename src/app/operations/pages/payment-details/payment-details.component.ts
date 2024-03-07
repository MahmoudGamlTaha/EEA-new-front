import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { RequestsSubmittedComponent } from './../requests-submitted/requests-submitted.component';
import { PaymentOfFeesService } from '@operations/services/payment-of-fees.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDetailsCardComponent } from '@operations/components/payment-details-card/payment-details-card.component';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { PaymentDetailsCard } from '@shared/model/card-data.model';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    CommonModule,
    PaymentDetailsCardComponent,
    SharedModule,
    SubtitleComponent,
    DynamicFormComponent,
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  paymentDetails: PaymentDetailsCard[];
  formModel;
  request;
  constructor(private paymentOfFeesService: PaymentOfFeesService , private requestSubmittedService:RequestSubmittedService , private route: ActivatedRoute) {
    
    this.formModel = this.paymentOfFeesService.paymentDetailsForm;
    this.route.paramMap.subscribe(params => {
      const id = params.get('requestId');
      this.getCustomerPaymentDetails(id)
    });
  }
  getCustomerPaymentDetails(id) {
    this.requestSubmittedService.getCustomerRequestById(id).subscribe(
      res=>{
        this.request = res['content']
        this.paymentDetails = this.paymentOfFeesService.getPaymentDetails(this.request);
      console.log(this.request)
      }
    )
  }
}
