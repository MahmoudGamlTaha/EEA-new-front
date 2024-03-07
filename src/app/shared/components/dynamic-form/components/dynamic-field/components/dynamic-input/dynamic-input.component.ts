import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicCheckerComponent } from '../dynamic-checker/dynamic-checker.component';
import { Field } from '@shared/model/input.model';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicCheckerComponent,
  ],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss',
})
export class DynamicInputComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;
  

  ngOnInit() {
  
  }
}
