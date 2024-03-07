import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { OperationsApiService } from '@operations/services/operations.api.service';

@Component({
  selector: 'app-reviewer-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    DynamicFormComponent,
    BtnDropdownComponent,
  ],
  templateUrl: './reviewer-form.component.html',
  styleUrl: './reviewer-form.component.scss',
})
export class ReviewerFormComponent {
  @Input() mainNote;
  @Input() reviewer: string;
  @Input() reviewersList;
  @Input() statusArr;
  @Input() statusNoteLabel;
  @Input() statusNote;
  @Input() requestId
  selectedStatus;

  constructor(private operationApiService: OperationsApiService) {}

  onSelectingStatus(status) {
    console.log(status)
    this.selectedStatus = status.value;
    const previousButtonElement = document.querySelector('.active');
    if (previousButtonElement) {
      previousButtonElement?.classList.remove('active');
    }
    const activeButtonElement = document.getElementById(status.name);
    activeButtonElement?.classList.add('active');
  }

  submitReviewerStatus() {
    this.operationApiService.updateRequestStatus(this.requestId, this.selectedStatus).subscribe(response => {
    })
  }
}
