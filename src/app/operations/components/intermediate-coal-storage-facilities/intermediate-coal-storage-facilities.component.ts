import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownType } from '@operations/enums/dropdown-type.enum';

@Component({
  selector: 'app-intermediate-coal-storage-facilities',
  templateUrl: './intermediate-coal-storage-facilities.component.html',
  styleUrls: ['./intermediate-coal-storage-facilities.component.scss']
})
export class IntermediateCoalStorageFacilitiesComponent implements OnInit {
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
