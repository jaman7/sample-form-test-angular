import { NgModule } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module.';
import { MainModule } from './components/main.module';
import { SharedModule } from './shared';

const appBaseName: string | any = '_app_base';
registerLocaleData(localePl);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, SharedModule, AppRoutingModule, MainModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: APP_BASE_HREF, useValue: window[appBaseName] || '/' },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
