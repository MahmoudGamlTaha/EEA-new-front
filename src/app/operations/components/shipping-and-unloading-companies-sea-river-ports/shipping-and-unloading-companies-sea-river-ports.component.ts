import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownType } from '@operations/enums/dropdown-type.enum';
import { TranslationService } from 'app/language/translation.service';

@Component({
  selector: 'app-shipping-and-unloading-companies-sea-river-ports',
  templateUrl: './shipping-and-unloading-companies-sea-river-ports.component.html',
  styleUrls: ['./shipping-and-unloading-companies-sea-river-ports.component.scss']
})
export class ShippingAndUnloadingCompaniesSeaRiverPortsComponent implements OnInit {
  currentLang: string = '';
  lang: string = '';
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
