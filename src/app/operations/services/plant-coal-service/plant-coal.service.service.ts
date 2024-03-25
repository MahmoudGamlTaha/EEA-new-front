import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantCoalServiceService {
  mainModel

  constructor(private http:HttpClient) { }
  initForm(plantForm?) {
    console.log(plantForm);
    
    return this.mainModel = {
      requestDetail:{
        type:'input-group',
        name:"requestDetail",
        col: 'col-12',
      subModel:{
        companyId: {
        label: 'plantCoal.usedCommercialIndustry',
        value: plantForm?plantForm.industrialRegisterUsed:'',
        col: 'col-md-5 col-12',
        type: 'select',
        options: plantForm?plantForm.industryRecords:[],
        rules: {
          required: true,
        }
      },
      landingHarborId: {
        type: 'select',
        value: plantForm?plantForm.landingHarborId:'',
        col: 'col-md-7 col-12',
        label: 'plantCoal.arriveHarbor',
        options:plantForm?plantForm.arriveHarborList:[],
        rules: {
          required: true
        },
      },
      coalTypeId: {
        label: 'plantCoal.coalType',
        value: plantForm?plantForm.coalType:'',
        col: 'col-md-5 col-12',
        type: 'select',
        options:plantForm?plantForm.coalTypeList:[],
        rules: {
          required: true,
        },
      },
      harborIds: {
        type: 'select',
        value: plantForm?plantForm.harborIds:'',
        col: 'col-md-7 col-12',
        label: 'plantCoal.exportHarbor',
        options:plantForm?plantForm.exportHarborList:[],
        rules: {
          required: true,
        },
      },
      amountOfCoalPlanInTon: {
        type: 'number',
        value: plantForm?plantForm.amountOfCoalPlanInTon:'',
        col: 'col-md-5 col-12',
        label: 'plantCoal.amount',
        rules: {
          required: true,
        },
      },

      otherAttachment: {
        name: 'Original_Contract',
         type: 'file',
            value: '',
            id: 'Plant_COAL_ORGINAL_CONTRACT',
            col: 'col-md-7 col-12 ',
            label: 'plantCoal.attach',
            rules: {
              required: true,
            },
        
      },  
    }
  },
    
      }
    }
    uploadAttachment(obj, customerRequestData?) {
      console.log(obj ,customerRequestData )
      //Check if the form is valid to move to another step
      if (
        obj.valid 
      ) {
     /*   this.uploadAttchment(
          obj['Plant_COAL_ORGINAL_CONTRACT'],
          'Plant_COAL_ORGINAL_CONTRACT',
          key)*/
        return;
      }
    }
    createCoalPlant(form){
      const url = `${environment.apiUrl}/portal/customer-request/plant-coal/5`
      return this.http.post(url,form);
    }
}
