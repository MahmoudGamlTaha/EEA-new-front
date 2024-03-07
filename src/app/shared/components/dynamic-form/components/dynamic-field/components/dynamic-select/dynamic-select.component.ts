import { LoaderService } from './../../../../../../../core/layout/services/loader.service';
import { LoaderComponent } from './../../../../../../../core/layout/components/loader/loader.component';
import { DialogService } from '@shared/services/dialog.service';
import { TranslationService } from './../../../../../../../language/translation.service';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicCheckerComponent } from '../dynamic-checker/dynamic-checker.component';
import { AddButtonComponent } from '../../../../../buttons/add-button/add-button.component';
import { Field } from '@shared/model/input.model';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicCheckerComponent,
    AddButtonComponent,
  ],
  templateUrl: './dynamic-select.component.html',
  styleUrl: './dynamic-select.component.scss',
})
export class DynamicSelectComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;
  addCompanyModel;
  companyActivities;
  currentLang: string;

  constructor(
    private translationService: TranslationService,
    private dialog: MatDialog,
    private dialogService : DialogService,
  ) {
    this.currentLang = this.translationService.currentLang;
  }

  ngOnInit(){

  }


  addCompany(e) {
    if (e === "") {
      console.log("Hellooooooooo")
      this.getCompanyActivity();
    }
  }
  getCompanyActivity(){
    this.dialogService.getCompanyActivity().subscribe(
      res=>{
        this.companyActivities = res['content']
        this.openDialog();
      }
    )
    }

  
  openDialog() {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      panelClass: 'custom-container',
      data: {
        row: 'row',
        option: 'addNewCompany',
        title:"Add Company",
        selectedForm:this.dialogService.getAddCompanyModel(this.companyActivities)
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    });
  }
}
