import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.languageService.init());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
