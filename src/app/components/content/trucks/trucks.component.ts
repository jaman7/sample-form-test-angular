import { Component } from '@angular/core';
import { OpenDocTypeEnum } from '@app/shared/enums/open-doc-type';
import { TableButtonsOpenType } from '@app/commons/table/table.enums';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { setColumnsConfig } from '@app/shared/utils/colums';
import { IModal } from '@app/commons/modal/modal.models';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { IColumn, IRowSelected } from '@app/commons/table/table.models';
import { DocOpenTypes } from '@app/shared/types/doc-types';
import { Toastr } from '@app/shared/enums/toastr';
import { MessageService } from 'primeng/api';
import { IDictType } from '@app/shared/models/dict-type';
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
export class TrucksComponent extends TrucksService {
  rows$ = this.getData({}).pipe(
    untilDestroyed(this),
    map((res: ITrucks[]) => res || []),
    tap(res => {
      this.tableTotalRecords = res.length;
      this.previousValue = res;
    }),
    catchError(() => of([]))
  );

  columns$: Observable<IColumn[]> = of(setColumnsConfig(this.columnConfig));

  previousValue: ITrucks[] = [];

  tableTotalRecords = 0;

  modal: IModal = {
    visible: false,
    type: undefined,
    id: undefined,
  };

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
    this.rows$ = this.getData({}).pipe(
      untilDestroyed(this),
      map((res: ITrucks[]) => res || []),
      tap(res => {
        this.tableTotalRecords = res.length;
        this.previousValue = res;
      }),
      catchError(() => of([]))
    );
  }

  onCloseModal(): void {
    this.modal = {
      visible: false,
      type: undefined,
    };
    this.loadData();
  }
}
