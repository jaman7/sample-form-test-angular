import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SpinnerModule } from '@app/commons/spinner/spinner.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [CommonModule, NgOptimizedImage, MainRoutingModule, ToastModule, HeaderModule, SpinnerModule],
  providers: [MessageService],
})
export class MainModule {}
