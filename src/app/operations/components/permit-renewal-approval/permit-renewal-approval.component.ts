import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-permit-renewal-approval',
  templateUrl: './permit-renewal-approval.component.html',
  styleUrls: ['./permit-renewal-approval.component.scss']
})
export class PermitRenewalApprovalComponent implements OnInit {
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
