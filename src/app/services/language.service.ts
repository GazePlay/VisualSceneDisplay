import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public activeLanguage = 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLanguage);
  }

  public switchLanguage(language: string){
    this.activeLanguage = language;
    this.translate.use(language);
  }
}
