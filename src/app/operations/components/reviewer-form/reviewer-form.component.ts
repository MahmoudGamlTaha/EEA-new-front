import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';
import { AdmissionFormApiService } from '@operations/services/admission-form/admission-form-api.service';
import { ActivatedRoute } from '@angular/router';

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
export class ReviewerFormComponent implements OnInit{
  @Input() mainNote;
  @Input() reviewer: string;
  @Input() reviewersList;
  @Input() statusArr;
  @Input() statusNoteLabel;
  @Input() statusNote;
  @Input() requestId;
  @Input() loggerList = [];
  selectedStatus;

  constructor(private operationApiService: OperationsApiService,private admissionFormApiService:AdmissionFormApiService ,
    private requestCoreService:RequestCoreService, private route:ActivatedRoute) {
      this.route.params.subscribe((params) => {
       this.requestId =  params['id'];
    this.admissionFormApiService.getRequestLog(this.requestId).subscribe(res=>{
      this.loggerList = res.content;
    });
      
     // this.requestCoreService.setLoggerList(this.loggerList);
   })
   // JSON.parse(this.requestCoreService.getLoggerList()).forEach(item=>{
     // this.loggerList.push(item);
    //})
   
  }
ngOnInit(): void {
  
}
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
