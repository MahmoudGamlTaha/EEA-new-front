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
  @ViewChild('coalPlantForm') coalPlantForm!: ElementRef;
  constructor(private plantService:PlantCoalServiceService, 
    private admissionFormUtilitiesService:AdmissionFormUtilitiesService,
    private utilitiesApiService: UtilitiesApiService,
    private auth:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private companyApiService:CompanyApiService,
    ){
     
      this.activeRoute.params.subscribe((params) => {
        this.formType = params?['formType']:undefined;
        this.requestId = params?['requestId']:undefined;
      });

  }
  coalValidationForm(form){
    return form;
  }
  getCoalType(){
    this.admissionFormUtilitiesService.getCoalType().subscribe((res) => {
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
  }
  getIndustrialNumber(){
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
  ngOnInit(): void {
    this.getCoalType();
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
      let form = {
        coalTypeId:formData.value['requestDetail'].coalTypeId,
        landingHarborId:formData.value['requestDetail'].landingHarborId,
        requestDetail:detailList
      }
      console.log(form);
      this.plantService.createCoalPlant(form).subscribe(res=>{
        if(res){
          this.toastr.success('Status Submitted Successfully');
          this.router.navigateByUrl('operations/requestsSubmitted');
        }
      });
    });
  
  
  }
}
