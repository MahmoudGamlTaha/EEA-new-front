import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-import-box-temp1',
  templateUrl: './import-box-temp1.component.html',
  styleUrls: ['./import-box-temp1.component.scss']
})
export class ImportBoxTemp1Component implements OnInit {

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
