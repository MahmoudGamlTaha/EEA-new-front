import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './operations-routing.module';
import { SharedModule } from '@shared/shared.module';
import { OperationsLayoutComponent } from './components/operations-layout/operations-layout.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { ImportBoxTemp1Component } from './components/import-box-temp1/import-box-temp1.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { NotificationsCardComponent } from '@shared/components/cards/notifications-card/notifications-card.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentAttachementComponent } from './components/document-attachement/document-attachement.component';
import { DynamicErrorComponent } from '@shared/components/dynamic-form/components/dynamic-error/dynamic-error.component';
import { DynamicDownloadComponent } from '@shared/components/dynamic-form/components/dynamic-field/components/dynamic-download/dynamic-download.component';
import { NewImportBoxComponent } from './pages/new-import-box/new-import-box.component';
import { ImportBoxTemp2Component } from './components/import-box-temp2/import-box-temp2.component';
import { ImportBoxReceiptComponent } from './components/import-box-receipt/import-box-receipt.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ShippingAndUnloadingCompaniesSeaRiverPortsComponent } from './components/shipping-and-unloading-companies-sea-river-ports/shipping-and-unloading-companies-sea-river-ports.component';
import { LandTransportationCompaniesCoalAndPetroleumComponent } from './components/Land-transportation-companies-coal-and-petroleum/Land-transportation-companies-coal-and-petroleum.component';
import { IntermediateCoalStorageFacilitiesComponent } from './components/intermediate-coal-storage-facilities/intermediate-coal-storage-facilities.component';
import { CompaniesUsingCoalAsAnInputComponent } from './components/companies-using-coal-as-an-input/companies-using-coal-as-an-input.component';
import { CementFactoriesComponent } from './components/cement-factories/cement-factories.component';
import { FeesChargesPaidComponent } from './components/fees-charges-paid/fees-charges-paid.component';

@NgModule({
  declarations: [
    OperationsLayoutComponent,
    ImportBoxTemp1Component,
    NewImportBoxComponent,
    ImportBoxTemp2Component,
    ImportBoxReceiptComponent,
    ReportsComponent,
    ShippingAndUnloadingCompaniesSeaRiverPortsComponent,
    LandTransportationCompaniesCoalAndPetroleumComponent,
    IntermediateCoalStorageFacilitiesComponent,
    CompaniesUsingCoalAsAnInputComponent,
    CementFactoriesComponent,
    FeesChargesPaidComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    SidebarComponent,
    SubtitleComponent,
    NotificationsCardComponent ,
    BtnDropdownComponent,
    ReactiveFormsModule,
    DocumentAttachementComponent,
    DynamicErrorComponent,
    DynamicDownloadComponent
  ],
})
export class OperationsModule {}
