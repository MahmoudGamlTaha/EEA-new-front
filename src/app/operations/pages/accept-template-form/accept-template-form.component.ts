import { CommonModule } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { FeesAndExpensesApiService } from '@operations/services/fees-and-express.api.service';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-accept-template-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    AttachedDocumentsComponent,
    DigitalSealingFormComponent,
    SubmitButtonComponent,
    SubtitleComponent,
    RdfFormComponent,
    ReviewerFormComponent
  ],
  templateUrl: './accept-template-form.component.html',
  styleUrl: './accept-template-form.component.scss'
})
@Injectable()
export class AcceptTemplateFormComponent implements OnInit {
  @Input() form: FormGroup;
  requestId;
  invoiceOfRequest;
  constructor( private formBuilder: FormBuilder, private router:Router,
    private route: ActivatedRoute, private fees:FeesAndExpensesApiService ){
      this.route.params.subscribe((params) => {
        this.requestId = params['requestId'];
      });
      console.log(this.requestId);
  }
  ngOnInit() :void {
      this.fees.getPaidInovice(this.requestId).subscribe( val=>{
         this.invoiceOfRequest = val['content'];
         console.log(this.invoiceOfRequest);
         this.initForm();
      });
    
    }
    initForm(){
      this.form = this.formBuilder.group({
        area: [],
      })
    }
}
