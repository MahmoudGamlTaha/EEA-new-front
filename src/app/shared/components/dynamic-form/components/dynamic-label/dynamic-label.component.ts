import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { DynamicCheckerComponent } from '../dynamic-field/components/dynamic-checker/dynamic-checker.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dynamic-label',
  standalone: true,
  imports: [CommonModule , DynamicCheckerComponent , TranslateModule],
  templateUrl: './dynamic-label.component.html',
  styleUrl: './dynamic-label.component.scss'
})
export class DynamicLabelComponent {
  @Input() formName: FormGroup;
  @Input() field: any;
  @Input() mainField: any;
  @Input() isSubModel:boolean
  @Input() checkerForm:boolean
  @Input() index: any;

  ngOnInit() {
  }
}
