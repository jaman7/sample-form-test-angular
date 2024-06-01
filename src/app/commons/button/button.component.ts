import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IButton } from './button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() config: IButton | undefined;

  @Input() customClass: string | string[] = '';

  private _buttonConfiguration: IButton[] = [];

  @Input() set buttonConfiguration(value: IButton[]) {
    this._buttonConfiguration = value ?? [];
    this.buttonConfiguration$ = of(this._buttonConfiguration);
  }

  @Output() btnClickId: EventEmitter<string | any> = new EventEmitter();

  @Output() btnClick: EventEmitter<MouseEvent> = new EventEmitter();

  buttonConfiguration$: Observable<IButton[]> = of(this._buttonConfiguration);

  onClickButton(event: MouseEvent, id?: string): void {
    this.btnClick.emit(event);
    this.btnClickId.emit(id);
  }
}
