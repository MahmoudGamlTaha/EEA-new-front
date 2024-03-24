import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-renewal-rejection',
  templateUrl: './renewal-rejection.component.html',
  styleUrls: ['./renewal-rejection.component.scss']
})
export class RenewalRejectionComponent implements OnInit {
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
