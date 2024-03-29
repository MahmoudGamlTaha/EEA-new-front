import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';
import { AdmissionFormApiService } from '@operations/services/admission-form/admission-form-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  @Input() customerRequest;
  selectedStatus;

  constructor(private operationApiService: OperationsApiService,private admissionFormApiService:AdmissionFormApiService ,
    private toastr: ToastrService,
    private router: Router,
    private requestCoreService:RequestCoreService, private route:ActivatedRoute) {
      this.route.params.subscribe((params) => {
       this.requestId =  params['id'];
     if(this.requestId != undefined){
      this.admissionFormApiService.getRequestLog(this.requestId).subscribe(res=>{
        this.loggerList = res.content;
       });
      }
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
    this.submitReviewerStatus();
  }

  submitReviewerStatus() {
   /* this.operationApiService.updateRequestStatus(this.requestId, 'AcceptFormI').subscribe(response => {
      alert(response);
      this.toastr.success('Status Submitted Successfully');
      this.router.navigateByUrl('operations/requestsSubmitted');
    })*/
    if(this.customerRequest){
      if(this.customerRequest.status == 'Created' && this.customerRequest.administrativeForwardTo == 9){
        this.operationApiService.updateRequestStatus(this.requestId, 'AcceptCoalPlant').subscribe(response => {
          
          this.toastr.success('Status Submitted Successfully');
          this.router.navigateByUrl('operations/requestsSubmitted');
        })
      }else if(this.customerRequest.status == 'AcceptCoalPlant' && this.customerRequest.administrativeForwardTo == 9){

      }
    }
  }
}
