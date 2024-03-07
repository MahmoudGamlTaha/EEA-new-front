import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { CementCompanyRdfService } from '@operations/services/cement-company-rdf.service';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-cement-company-rdf',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    RdfFormComponent,
    DynamicFormComponent,
    BtnDropdownComponent,
    BtnComponent,
    ReviewerFormComponent,
  ],
  templateUrl: './cement-company-rdf.component.html',
  styleUrl: './cement-company-rdf.component.scss',
})
export class CementCompanyRdfComponent {
  @ViewChild('rdfForm') rdfForm!: ElementRef;
  reviewerForm: boolean;
  mainNote;
  reviewer: string = 'مصطفى محمد';
  reviewersList;
  statusArr;
  statusNote;
  constructor(private cementCompanyRdfService: CementCompanyRdfService , protected auth : AuthService) {
    this.mainNote = this.cementCompanyRdfService.mainNote;
    this.reviewersList = this.cementCompanyRdfService.reviewersList;
    this.statusArr = this.cementCompanyRdfService.statusArr;
    this.statusNote = this.cementCompanyRdfService.statusNote;
  }

}
