import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conditional-renewal-approval',
  templateUrl: './conditional-renewal-approval.component.html',
  styleUrls: ['./conditional-renewal-approval.component.scss']
})
export class ConditionalRenewalApprovalComponent implements OnInit {
  form:FormGroup

  constructor(
    private formBuilder :FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.form = this.formBuilder.group({
      area: [],
    })
  }
}
