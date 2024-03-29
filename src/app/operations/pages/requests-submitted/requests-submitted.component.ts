import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DropDownItem } from '@shared/model/dropDown.model';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicTableComponent } from '@shared/components/dynamic-table/dynamic-table.component';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { FilterComponent } from '@operations/components/filter/filter.component';
import { SearchComponent } from '@operations/components/search/search.component';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';

@Component({
  selector: 'app-requests-submitted',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    SearchBarComponent,
    DynamicFormComponent,
    SubmitButtonComponent,
    ReactiveFormsModule,
    DynamicTableComponent,
    BtnDropdownComponent,
    FilterComponent,
    SearchComponent,
  ],
  templateUrl: './requests-submitted.component.html',
  styleUrl: './requests-submitted.component.scss',
})
export class RequestsSubmittedComponent {
  formGroup: FormGroup;
  serviceNameDropDownList: DropDownItem[];
  statusDropDownList: DropDownItem[];
  formModel;
  formType;
  requestTypes:Map<number,string> = new Map<number,string>();

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(private requestSubmittedService: RequestSubmittedService
    ,private router: Router  
    , private auth : AuthService,
    private requestCoreService :RequestCoreService) {
    this.serviceNameDropDownList =
      this.requestSubmittedService.serviceNameDropDownList;
    this.statusDropDownList = this.requestSubmittedService.statusDropDownList;
    this.formModel = this.requestSubmittedService.date;
    this.headers = this.requestSubmittedService.tableHeader;
    // this.tableData = this.requestSubmittedService.tableData;
    // console.log(this.tableData);
   
  }

  ngOnInit() {
    this.requestSubmittedService.getCustomerRequests().subscribe((res) => {
      this.tableData = [];
         
      for (let request of res['content']) {
        this.requestTypes.set(request['id'],request['requestType']?.code);
        this.tableData.push({
          serviceName:request?.requestType.name,
          orderNumber: request['id'],
          orderDate: request['createdDate'],
          status: request['status'],
          copyOfApproval: 'tableHeader.viewFile',
          modelAutomated: 'tableHeader.viewFile',
          details: 'التفاصيل',
          orderTracking: 'tableHeader.orderTracking',
        });
     
      }
      this.getTable();
    });

  }

  ngAfterViewInit()
 {
  this.dynamicTableWrapper.buttonClick.subscribe((event) => {
    
    let check = event.row['status'] == 'Created' || event.row['status'] == 'CompleteEntry';
    this.requestCoreService.customerRequestId = event.row['orderNumber'];
    this.requestCoreService.setCustomerRequestStatus(event.row['status']);
    if(event['key'] == 'details') {
      switch(this.auth.userRole[0]) {
          case 'department_supervisor':
             
            if((this.auth.user.sub.administrativeId == 8 || this.auth.user.sub.administrativeId == 11 || this.auth.user.sub.administrativeId == 9) && check) {
              this.formType ="check";
            }else if(this.auth.user.sub.administrativeId == 8 &&  event.row['status'] == 'AcceptRDF'){
              this.formType ="check";
            }else {//if (this.auth.user.sub.administrativeId == 12) {
              this.formType = 'view-only';
             // this.router.navigateByUrl('operations/feesAndExpenses/'+ event.row['orderNumber'])
            }
          break;
          case 'customer':
              if(event.row['status'].indexOf("Accept") != -1 ||
               event.row['status'].indexOf("Confirm") != -1 ||
                event.row['status'].indexOf("Rejected") != -1 || event.row['status'].indexOf("CustomerPAID") != -1){
                this.formType = 'view-only'
              }else
               this.formType = 'edit'
          break;
      }
      let redirectUrl = "operations/requestForm";
      console.log(event.row['orderNumber']);
      console.log(this.requestTypes.get(event.row['orderNumber']));
      if(this.requestTypes.get(event.row['orderNumber']) ==='coal-plant'){
        redirectUrl = "operations/plant-coal";
      }
      this.router.navigateByUrl(`${redirectUrl}/${this.formType}/`+ event.row['orderNumber'])

    }
});
 }

  getTable(){
    const headers = this.headers.headers.map(
      (header, i) =>
        ({
          key: header.substring(12),
          translatedKey: header,
          index: i,
          isSelected: true,
        } as TableHeader)
    );
    if(this.tableData?.length>0){
      this.dynamicTableWrapper.render(headers, this.tableData);
    }
  }
  searchRequest(){

  }
  search(e) {
    alert(555);
    console.log(e);
  }
  filter(e) {
    alert(666);
    console.log(e);
  }
}
