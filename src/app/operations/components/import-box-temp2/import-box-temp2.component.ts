import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-import-box-temp2',
  templateUrl: './import-box-temp2.component.html',
  styleUrls: ['./import-box-temp2.component.scss']
})
export class ImportBoxTemp2Component implements OnInit {
  form:FormGroup
  constructor(
    private formBuilder: FormBuilder,
  ){
  }

  ngOnInit(
  ) {
    this.initForm()
  }

  initForm(){
    this.form = this.formBuilder.group({
      area: [],
    })
  }
}
