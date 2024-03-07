import { ImportBoxService } from './../../services/import-box.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { NotificationCard } from '@shared/model/card-data.model';
import { DropDownItem } from '@shared/model/dropDown.model';
import { NotificationsCardComponent } from '@shared/components/cards/notifications-card/notifications-card.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-import-box',
  standalone: true,
  imports: [CommonModule, SharedModule, SubtitleComponent , NotificationsCardComponent , BtnDropdownComponent],
  templateUrl: './import-box.component.html',
  styleUrl: './import-box.component.scss',
})
export class ImportBoxComponent implements OnInit {
  dropDownList: DropDownItem[];
  notificationCards: NotificationCard[];

  constructor(private importBoxService : ImportBoxService ,  private requestSubmitted: RequestSubmittedService) {
    this.dropDownList = this.importBoxService.dropDownList;
    this.notificationCards = this.importBoxService.notificationCards;
  }

  ngOnInit(){
    this.requestSubmitted.getCustomerRequests().subscribe(response => {
     // this.importBoxService.initNotifications(response['content']);
      this.notificationCards = this.importBoxService.notificationCards;
      
    })
    
  }
}
