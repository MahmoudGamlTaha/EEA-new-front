import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-refusal-to-renew-permit',
  templateUrl: './refusal-to-renew-permit.component.html',
  styleUrls: ['./refusal-to-renew-permit.component.scss']
})
export class RefusalToRenewPermitComponent implements OnInit {
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
