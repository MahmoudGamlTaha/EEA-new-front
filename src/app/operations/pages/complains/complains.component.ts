import { AuthService } from '../../../core/services/auth.service';
import { ComplainsService } from '../../services/complains.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DropDownItem } from '@shared/model/dropDown.model';
import { FormsModule } from '@angular/forms';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { ComplainsForm } from '@operations/models/customerForm.model';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';

@Component({
  selector: 'app-complains',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    FormsModule,
    DynamicFormComponent,
    BtnDropdownComponent
  ],
  templateUrl: './complains.component.html',
  styleUrl: './complains.component.scss',
})
export class ComplainsComponent {
  @ViewChild('form') form!: ElementRef;
  dropDownList: DropDownItem[];
  formModel: ComplainsForm;

  constructor(private complainsService: ComplainsService , private authService : AuthService) {
    this.dropDownList = this.complainsService.dropDownList;
    this.formModel = this.complainsService.formModel;
  }

  onSubmit() {
    let form = this.form['dynamicFormGroup'].value;
    let requesterId = this.authService

    let complain = {
      summary:form.complaint
    }
    this.complainsService.sendingComplains(complain).subscribe(
      res=>console.log(res)
    )
  }
}
