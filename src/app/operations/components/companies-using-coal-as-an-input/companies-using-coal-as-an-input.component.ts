import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownType } from '@operations/enums/dropdown-type.enum';

@Component({
  selector: 'app-companies-using-coal-as-an-input',
  templateUrl: './companies-using-coal-as-an-input.component.html',
  styleUrls: ['./companies-using-coal-as-an-input.component.scss']
})
export class CompaniesUsingCoalAsAnInputComponent implements OnInit {
  form:FormGroup
  page = 1

  dropDownList = [
    {
      type:DropdownType.reportYear,
      name: 'customer.companyInfo'
    },
    {
      type:DropdownType.reportYear,
      name: 'customer.customerRequests'
    },
    {
      type:DropdownType.reportYear,
      name: 'customer.changePassword',
    },
    {
      type:DropdownType.reportYear,
      name:'routingHeader.company',
    },
  ];
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

  getDropDownItem(event) {
    console.log(event);

  }
}
