import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class TranslateResolver {
  constructor(private languageService: LanguageService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    const i18nPartials = this.getRouteTranslatePartials(route);
    return this.languageService.getPartialsTranslation(i18nPartials);
  }

  private getRouteTranslatePartials(route: ActivatedRouteSnapshot): string[] {
    const i18n = route.data.i18n || [];
    return Array.isArray(i18n) ? i18n : [i18n];
  }
}
