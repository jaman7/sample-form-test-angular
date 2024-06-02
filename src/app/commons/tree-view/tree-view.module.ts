import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectToArrayPipe } from '@app/pipes/keys-loop.pipe';
import { TreeViewComponent } from './tree-view.component';

@NgModule({
  declarations: [TreeViewComponent, ObjectToArrayPipe],
  imports: [CommonModule],
  exports: [TreeViewComponent],
})
export class TreeViewModule {}
