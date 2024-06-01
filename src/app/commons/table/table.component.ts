import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TableLazyLoadEvent } from 'primeng/table';
import { IColumn, IRowSelected, OperationButtonTypes } from './table.models';
import { IButton } from '../button/button.model';
import { TableButtons, TableButtonsOpenType } from './table.enums';

const { SHOW, EDIT, DELETE } = TableButtons;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnChanges {
  private _columns: IColumn[] = [];

  private actionOnDataSubject: Subject<any> = new Subject<any>();

  @Input() quantity: number = 5;

  @Input() rows: any[] = [];

  @Input() lazy: boolean = false;

  @Input() totalRecords: number;

  @Input() paginator: boolean = true;

  @Input() showControls: boolean;

  @Input() showCurrentPageReport: boolean = true;

  @Input() range: number[] = [5, 70, 5];

  @Input() buttonKeys: any[] = [SHOW, EDIT, DELETE];

  @Output() actionOnData: EventEmitter<any> = new EventEmitter<any>();

  @Output() buttonEvent: EventEmitter<IRowSelected> = new EventEmitter<IRowSelected>();

  rowPerPageOptions: number[];

  rows$: Observable<any[]> = of([]);

  buttonConfig: IButton[] = [];

  @Input()
  set columns(value: IColumn[]) {
    if (value?.length) {
      value.forEach(item => (item.visible = true));
    }
    this._columns = value ?? [];
  }

  get columns(): IColumn[] {
    return this._columns;
  }

  ngOnInit(): void {
    const [start, stop, step] = this.range;
    this.rowPerPageOptions = this.generateRange(start, stop, step);
    this.buttonConfig = this.generateButtonConfig(this.buttonKeys);
    this.actionOnDataSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe(search => {
      this.actionOnData.emit(search);
    });
  }

  ngOnChanges(): void {
    this.loadRows();
  }

  loadRows(): void {
    this.rows$ = of([...this.rows]);
  }

  onLazyOutput(event: TableLazyLoadEvent): void {
    const { filters, ...rest } = event || {};
    this.actionOnDataSubject.next({ ...rest, filters });
  }

  generateRange(start: number, stop: number, step: number): number[] {
    return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
  }

  customizeValue(value: any, column: IColumn): string {
    return column.customizeValue ? column.customizeValue(value) : value;
  }

  onClick(buttonId: OperationButtonTypes, row: any): void {
    const type = TableButtonsOpenType[buttonId.toUpperCase() as keyof typeof TableButtonsOpenType];
    this.buttonEvent.emit({ openType: type, id: row.id });
  }

  generateButtonConfig(keys: OperationButtonTypes[]): IButton[] {
    return keys.map(key => ({
      id: key,
      icon: key,
      isRound: true,
      className: 'table-btn',
      tooltipTitle: `common.table.tooltip.${key}`,
    }));
  }
}
