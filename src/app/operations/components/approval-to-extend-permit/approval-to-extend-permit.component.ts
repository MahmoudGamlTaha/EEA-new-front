import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-approval-to-extend-permit',
  templateUrl: './approval-to-extend-permit.component.html',
  styleUrls: ['./approval-to-extend-permit.component.scss']
})
export class ApprovalToExtendPermitComponent implements OnInit {
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
