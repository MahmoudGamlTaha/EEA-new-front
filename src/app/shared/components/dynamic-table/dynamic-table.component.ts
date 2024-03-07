import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTable, TableHeader } from '@shared/model/dynamic-table.model';
import { BtnComponent } from '../buttons/btn/btn.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

enum status {
  accepted = 'Accepted',
  accept = 'Accept',
  underReview ='UnderReview',
  rejected = 'Rejected',
  CompleteEntry= 'CompleteEntry',
  CorrectEntry = 'CorrectEntry',
  AcceptProtectEEA = 'AcceptProtectEEA',
  AcceptManager = 'AcceptManager',
  Created = 'Created',
  AcceptRDF = 'AcceptRDF'
}
@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, BtnComponent, TranslateModule , RouterModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<any>();
  //Fields
  tableData: DynamicTable;
  allHeaders: TableHeader[];
  status: typeof status = status;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tableData = { headers: [], data: [] };
  }

  render(headers: TableHeader[], data: any[]) {
    this.tableData = {
      headers: headers,
      data: data,
    };
    this.allHeaders = headers;
    console.log(this.tableData)
    this.changeDetector.detectChanges();
  }

  handleButtonClick(key: string, row: any) {
    this.buttonClick.emit({ key, row });
  }
}
