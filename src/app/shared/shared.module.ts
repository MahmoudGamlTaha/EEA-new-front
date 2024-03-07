import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDefaultParser, TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedServicesComponent } from './components/shared-services/shared-services.component';
import { ServiceCardComponent } from './components/cards/service-card/service-card.component';
import { HoverClassDirective } from './Directives/hover-class.directive';
import { TxtIconComponent } from './components/txt-icon/txt-icon.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    SharedServicesComponent,
    ServiceCardComponent,
    HoverClassDirective,
    TxtIconComponent,
  ],
  imports: [CommonModule, TranslateModule, HttpClientModule, RouterModule],
  exports: [
    HttpClientModule,
    TranslateModule,
    SharedServicesComponent,
    TxtIconComponent,
    HoverClassDirective,
  ],
  providers: [TranslateDefaultParser],
})
export class SharedModule {}
