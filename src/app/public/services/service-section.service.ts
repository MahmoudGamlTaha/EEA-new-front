import { Injectable } from '@angular/core';
import { ServiceCard } from '@shared/model/card-data.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceSectionService {
  cardsData: ServiceCard[] = [
    {
      title: 'services.firstCard.title',
      description: 'services.firstCard.description',
      url: '../../../../../assets/images/landing page – 1/clipboard (1).png',
      urlHover: '../../../../../assets/images/landing page – 1/clipboard.png',
      path:'login'
    },
    {
      title: 'services.secondCard.title',
      description: 'services.secondCard.description',
      url: '../../../../../assets/images/landing page – 1/report.png',
      urlHover: '../../../../../assets/images/landing page – 1/report.png',
      path:'login'
    },
    {
      title: 'services.thirdCard.title',
      description: 'services.thirdCard.description',
      url: '../../../../../assets/images/landing page – 1/clipboard (1).png',
      urlHover:
        '../../../../../assets/images/landing page – 1/clipboard (1).png',
        path:'login'
    },
    {
      title: 'services.fourthCard.title',
      description: 'services.fourthCard.description',
      url: '../../../../../assets/images/landing page – 1/replacement.png',
      urlHover: '../../../../../assets/images/landing page – 1/replacement.png',
      path:'login'
    },
    {
      title: 'services.fifthCard.title',
      description: 'services.fifthCard.description',
      url: '../../../../../assets/images/landing page – 1/alter.png',
      urlHover: '../../../../../assets/images/landing page – 1/alter.png',
      path:'login'
    },
    {
      title: 'services.sixthCard.title',
      description: 'services.sixthCard.description',
      url: '../../../../../assets/images/landing page – 1/validation.png',
      urlHover: '../../../../../assets/images/landing page – 1/validation.png',
      path:'login'
    },
  ];
  constructor() {}
}
