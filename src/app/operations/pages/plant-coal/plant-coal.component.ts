import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DigitalSealingSubmitionComponent } from '../digital-sealing-submition/digital-sealing-submition.component';
import { TranslateModule } from '@ngx-translate/core';
import { PlantCoalServiceService } from '@operations/services/plant-coal-service/plant-coal.service.service';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { AuthService } from 'app/core/services/auth.service';
import { CompanyApiService } from '@shared/services/company.api.service';
import { DropDownItem, DropDownObj } from '@shared/model/dropDown.model';
import { RequestDetail } from '@shared/model/RequestDetail.model';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-plant-coal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    SubtitleComponent,
    DigitalSealingSubmitionComponent, TranslateModule ],
  templateUrl: './plant-coal.component.html',
  styleUrl: './plant-coal.component.scss'
})
export class PlantCoalComponent implements OnInit{
  model:{};
  requestId;
  formType;
  customerRequestData;
  @ViewChild('coalPlantForm') coalPlantForm!: ElementRef;
  constructor(private plantService:PlantCoalServiceService, 
    private admissionFormUtilitiesService:AdmissionFormUtilitiesService,
    private utilitiesApiService: UtilitiesApiService,
    private auth:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private companyApiService:CompanyApiService,
    private requestSubmittedService:RequestSubmittedService
    ){
     
     }
  coalValidationForm(form){
    return form;
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.formType = params['formType'];
      this.requestId = params['requestId'];
    
      if(this.requestId){
        
        this.getRequestById(this.requestId);
      }else{
      this.getCoalType();
      }
    });
    
  }
  getCoalType(){
    this.admissionFormUtilitiesService.getCoalType().subscribe((res) => {
      console.log(this.model);
      this.model = {
        ...this.model,
        coalTypeList: res['content']
      }
      this.getArrivedHarbor();
    });
  }
  getArrivedHarbor(){
    this.admissionFormUtilitiesService.getHarborList().subscribe((res)=>{
    
      this.model['exportHarborList'] = res['content'];
      this.model['arriveHarborList'] = res['content'];
      console.log(res['content']);
      this.getIndustrialNumber();
    })
  }
  getExportHarbor(){
    this.model = this.plantService.initForm(this.model);  
    console.log(this.model);
  }
  getIndustrialNumber(){
    let data : DropDownObj[] = [];
    
    if(this.auth.user.sub.administrativeId != null && this.customerRequestData != undefined){
     
       this.companyApiService.getCompanyById(this.customerRequestData.companyId).subscribe(res=>{ 
        let company = res['content'];
        data.push({name:company.industryNumber,id:company.id});
      
        this.model['industryRecords'] = data;
        this.getExportHarbor();

       })
    }else{
    this.companyApiService
    .getCompanyByOwnerId(this.auth.user.sub.id).subscribe(res=>{
      let data : DropDownObj[] = [];
      let companies = res['content'];
      companies.forEach(co =>{
       
       data.push({name:co.industryNumber,id:co.id});
      })
      
      this.model['industryRecords'] = data;
      console.log(data);
      this.getExportHarbor();
    })
  }
  
  }

  onSubmit(){

    let formData = this.coalPlantForm['dynamicFormGroup'];
    console.log(formData)
    console.log(formData.value['requestDetail']);
    let detailList :RequestDetail[] = [];
    detailList.push(formData.value['requestDetail']);
    detailList[0].harborIds = [formData.value['requestDetail'].harborIds];
    detailList[0].otherAttachment = [formData.value['requestDetail'].otherAttachment];
    let formFileData = new FormData();
    formFileData.append('files', formData.value['requestDetail'].otherAttachment[0], formData.value['requestDetail'].otherAttachment.name);
    this.utilitiesApiService.uploadFile(formFileData).subscribe(res=>{
      let data = res['content'];
      console.log(data);
      detailList[0].otherAttachment[0].id =  data[0].id;
      detailList[0].otherAttachment[0].fileField = "Plant_COAL_ORGINAL_CONTRACT";
      let form = {
        coalTypeId:formData.value['requestDetail'].coalTypeId,
        landingHarborId:formData.value['requestDetail'].landingHarborId,
        requestDetail:detailList
      }
      
      this.plantService.createCoalPlant(form).subscribe(res=>{
        if(res){
          this.toastr.success('request Submitted Successfully');
          this.router.navigateByUrl('operations/requestsSubmitted');
        }
      });
    });
  
  
  }
  getRequestById(id, inputFieldsList?) {
    this.requestSubmittedService
      .getCustomerRequestById(id)
      .subscribe((request) => {
        this.customerRequestData = request['content']
        this.model = this.customerRequestData;
        this.getCoalType();
    //     let requestCompnay = this.companies.filter((c)=>{
      //  return c.id == this.customerRequestData.companyId
       // })[0];
    
        if(request['content'].status == 'AcceptProtectEEA' ){
              this.formType = 'view-only'
        }
     
      });
      
  }

  getInputFieldsToBeEditted(id) {
/*    this.operationsApiService.getInputField(id).subscribe((response) => {
      this.inputsList = response.content.map((field) => field.field);
      this.inputsListIds = response.content.map(field => field.id)
      this.getRequestById(id, this.inputsList);
    });*/
  }
}
