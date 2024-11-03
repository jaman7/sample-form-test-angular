import { Component, OnInit } from '@angular/core';
import { OpenDocTypeEnum } from '@app/shared/enums/open-doc-type';
import { SortingFiltersTableParams, TableButtonsOpenType } from '@app/commons/table/table.enums';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, catchError, concatMap, delay, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { setColumnsConfig } from '@app/shared/utils/colums';
import { IModal } from '@app/commons/modal/modal.models';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ITableColumn, IRowSelected } from '@app/commons/table/table.models';
import { DocOpenTypes } from '@app/shared/types/doc-types';
import { Toastr } from '@app/shared/enums/toastr';
import { MessageService } from 'primeng/api';
import { IDictType } from '@app/shared/models/dict-type';
import { ParamsDTO } from '@app/core/http/http.model';
import { TableLazyLoadEvent } from 'primeng/table';
import { setTableParamsByColumnConfig } from '@app/shared/utils/table';
import { TrucksService } from './trucks.service';
import { ITrucks } from './trucks.model';

const { SHOW, EDIT, ADD } = OpenDocTypeEnum;
const { DELETE } = TableButtonsOpenType;
const { SUCCESS_DELETED } = Toastr;

export enum ToastrTruck {
  errorDeletedTruck = 'toastr.errorDeletedTruck',
}

@UntilDestroy()
@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
})
export class TrucksComponent extends TrucksService implements OnInit {
  subject = new BehaviorSubject<number>(1);

  rows$ = this.rows;

  columns$: Observable<ITableColumn[]> = of(setColumnsConfig(this.columnConfig));

  previousValue: ITrucks[] = [];

  tableTotalRecords = 0;

  modal: IModal = {
    visible: false,
    type: undefined,
    id: undefined,
  };

  tableParams: ParamsDTO = {};

  statusDict: IDictType[] = [
    { id: 1, displayName: 'LOADING' },
    { id: 2, displayName: 'TO_JOB' },
    { id: 3, displayName: 'AT_JOB' },
    { id: 4, displayName: 'RETURNING' },
    { id: 5, displayName: 'OUT_OF_SERVICE' },
  ];

  dictionaries: IDictType = {
    statusId: this.statusDict,
  };

  constructor(
    public httpClient: HttpClient,
    private translate: TranslateService,
    private messageService: MessageService
  ) {
    super(httpClient);
  }

  ngOnInit(): void {
    // this.subject.pipe(mergeMap(value => of(`mergeMap: ${value}`).pipe(delay(1000)))).subscribe(a => console.log(a));
    // this.subject.pipe(switchMap(value => of(`switchMap: ${value}`).pipe(delay(1000)))).subscribe(console.log);
    // of(1, 2, 3, 4)
    //   .pipe(concatMap(value => of(`concatMap: ${value}`)))
    //   .subscribe(console.log);
    // of(1, 2, 3, 4)
    //   .pipe(mergeMap(value => of(`mergeMap: ${value}`)))
    //   .subscribe(console.log);
    // of(1, 2, 3, 4)
    //   .pipe(switchMap(value => of(`switchMap: ${value}`)))
    //   .subscribe(console.log);
    // this.subject.next(2);
    // this.subject.next(3);
    // this.subject.next(4);
    // this.subject.next(5);
  }

  onActionSearch(event: TableLazyLoadEvent): void {
    const { ID_DESC } = SortingFiltersTableParams;
    this.tableParams = setTableParamsByColumnConfig(this.columnConfig, { ...this.tableParams }, event, ID_DESC);
    this.loadData();
  }

  onDocAction(event: IRowSelected): void {
    const { id, openType } = event;
    if (openType === SHOW || openType === EDIT) {
      this.modal = {
        visible: true,
        type: openType as DocOpenTypes,
        id,
      };
    }
    if (openType === DELETE) {
      this.onClickDelete(id);
    }
  }

  onClickDelete(id: number): void {
    this.deleteData(id)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.translate.instant(SUCCESS_DELETED),
          });
          this.loadData();
        }),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.translate.instant(ToastrTruck.errorDeletedTruck),
          });
          return of(false);
        })
      )
      .subscribe();
  }

  onClickAdd(): void {
    this.modal = {
      visible: true,
      type: ADD,
    };
  }

  loadData(): void {
    this.rows$ = this.rows;
  }

  get rows(): Observable<any> {
    return this.getData(this.tableParams).pipe(
      untilDestroyed(this),
      map(res => {
        if (res) {
          console.log(res);
          this.previousValue = res || [];
          return res;
        }
        return this.previousValue ?? [];
      }),
      catchError((e): any => {
        console.log(e);
        return of([]);
      })
    );
  }

  onCloseModal(): void {
    setTimeout(() => {
      this.modal = {
        visible: false,
        type: undefined,
      };
      this.loadData();
    }, 5);
  }
}
