import { Component, OnInit, Input } from '@angular/core';
import { MainHeaderItem, MenutItem } from '../../../../models/menu-header.model';
import { HeaderService } from '../../../../services/header.service';
import { TranslationService } from '../../../../../../language/translation.service';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss',
})
export class MenuHeaderComponent implements OnInit {
  @Input() currentUrl: string;

  menuItems: MainHeaderItem;
  currentLang: string;

  constructor(
    private headerService: HeaderService,
    private translationService: TranslationService,
    private authSerivce: AuthService
  ) {
    this.currentLang = this.translationService.currentLang;
  }
  ngOnInit(): void {
    this.authSerivce.isLoggedInSubject$.subscribe(isLoggedIn => {
      if(isLoggedIn) {
          if(this.authSerivce.user.sub.administrativeId == 8){
            return this.menuItems = this.headerService.getMenuHeader('investor-agent')
          } else if (this.authSerivce.user.sub.administrativeId == 7){
            return this.menuItems = this.headerService.getMenuHeader('top_manager')
          }
        this.menuItems = this.headerService.getMenuHeader(this.authSerivce.userRole)
      } else {
        this.menuItems = this.headerService.getMenuHeader("default")
      }
    })
  }
}
