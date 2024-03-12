import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  viewReport:number = 1

  constructor() { }

  ngOnInit() {
  }


  chooseReport(number:number){
    this.viewReport = number
  }

}
