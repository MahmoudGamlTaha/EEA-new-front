import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fees-charges-paid',
  templateUrl: './fees-charges-paid.component.html',
  styleUrls: ['./fees-charges-paid.component.scss']
})
export class FeesChargesPaidComponent implements OnInit {
  form:FormGroup

  constructor(
    private formBuilder :FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.form = this.formBuilder.group({
      requestNumber: [],
      requestDate: [],
    })
  }

}
