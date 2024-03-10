import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DocumentAttachementComponent } from '@operations/components/document-attachement/document-attachement.component';
import { EndorsementService } from '@operations/services/endorsement.service';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { NotificationsCardComponent } from '@shared/components/cards/notifications-card/notifications-card.component';
import { DynamicErrorComponent } from '@shared/components/dynamic-form/components/dynamic-error/dynamic-error.component';
import { DynamicDownloadComponent } from '@shared/components/dynamic-form/components/dynamic-field/components/dynamic-download/dynamic-download.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-new-import-box',
  templateUrl: './new-import-box.component.html',
  styleUrls: ['./new-import-box.component.scss']
})
export class NewImportBoxComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ){
  }

  ngOnInit(
  ) {
  }

}
