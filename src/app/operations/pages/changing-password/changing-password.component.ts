import { ChangingPasswordService } from './../../services/changing-password.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';

@Component({
  selector: 'app-changing-password',
  standalone: true,
  imports: [CommonModule , SubtitleComponent , SharedModule , DynamicFormComponent , SubmitButtonComponent],
  templateUrl: './changing-password.component.html',
  styleUrl: './changing-password.component.scss'
})
export class ChangingPasswordComponent {
formModel;

constructor(private changingPasswordService :ChangingPasswordService){
this.formModel = this.changingPasswordService.changingPasswordForm;
}
}
