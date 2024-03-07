import { PaymentOfFeesService } from './../../services/payment-of-fees.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { NotificationCard } from '@shared/model/card-data.model';
import { DropDownItem } from '@shared/model/dropDown.model';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { NotificationsCardComponent } from '@shared/components/cards/notifications-card/notifications-card.component';

@Component({
  selector: 'app-payment-of-fees',
  standalone: true,
  imports: [CommonModule , SharedModule , SubtitleComponent , NotificationsCardComponent , BtnDropdownComponent],
  templateUrl: './payment-of-fees.component.html',
  styleUrl: './payment-of-fees.component.scss'
})
export class PaymentOfFeesComponent {
  dropDownList:DropDownItem[] ;
  notificationCards:NotificationCard[];

  constructor( private paymentOfFeesService : PaymentOfFeesService){
    this.dropDownList = this.paymentOfFeesService.dropDownList;
    this.notificationCards = this.paymentOfFeesService.notificationCards;
  }

}
