import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { NzSelectComponent, NzSelectSearchComponent } from 'ng-zorro-antd/select';
import { ConfigDefault, ISelect } from './select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  _config: ISelect = ConfigDefault();

  @Input() set config(configSet: Partial<ISelect>) {
    this._config = { ...this._config, ...configSet };
  }

  get config(): ISelect {
    return this._config;
  }

  @Input() formControl: UntypedFormControl;

  @Input() value: any;

  @Output() changeValue: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(NzSelectComponent) nzSelectComponent: NzSelectComponent;

  @ViewChild('selectContainer') formFieldContainer: ElementRef<HTMLElement>;

  private nzSelectSearchComponent: NzSelectSearchComponent;

  isDisabled: boolean;

  isActive: boolean;

  isFilled: boolean;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.nzSelectSearchComponent = this.nzSelectComponent.nzSelectTopControlComponent.nzSelectSearchComponent;
    this.cdRef.detectChanges();
  }

  writeValue(inputValue: any): void {
    this.value = inputValue;
    if (this.config?.placeholder || this.config?.labelTitle) {
      this.isFilled = !!inputValue || (typeof inputValue === 'boolean' && inputValue !== null);
    } else {
      this.isFilled = false;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange: (value: any) => void = () => {};

  onTouched: () => void = () => {};

  openChange(isOpen: boolean): void {
    this.isActive = isOpen;
  }

  changeOption(selectedItem: any): void {
    if (!selectedItem) {
      this.resetSelection();
      return;
    }
    this.setSelection(selectedItem);
  }

  onBlur(): void {
    this.onTouched();
  }

  returnSelectValue(item: any): string {
    return item?.id ?? item?.val ?? item?.terCode ?? item?.name ?? item?.displayName ?? '';
  }

  returnSelectLabel(item: any): string {
    return item?.displayName ?? item?.description ?? item?.name ?? '';
  }

  private resetSelection(): void {
    this.nzSelectSearchComponent.onValueChange(null);
    this.value = null;
    this.changeValue.emit(null);
    this.onChange(null);
  }

  private setSelection(selectedItem: any): void {
    this.value = selectedItem;
    this.nzSelectSearchComponent.clearInputValue();
    this.changeValue.emit(selectedItem);
    this.onChange(selectedItem);
    if (this.formControl) {
      this.formControl.markAsTouched();
    }
  }
}
