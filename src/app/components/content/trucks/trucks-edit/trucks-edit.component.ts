import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IModal } from '@app/commons/modal/modal.models';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay, tap } from 'rxjs';
import { IFormElements } from '@app/commons/form-elements/form-elements.models';
import { setFormConfig } from '@app/shared/utils/forms';
import { IDictType } from '@app/shared/models/dict-type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OpenDocTypeEnum } from '@app/shared/enums/open-doc-type';
import { MessageService } from 'primeng/api';
import { Toastr } from '@app/shared/enums/toastr';
import { TranslateService } from '@ngx-translate/core';
import { TrucksEditService } from './trucks-edit.service';
import { ITrucks, ITrucksForm } from '../trucks.model';

const { SHOW, ADD } = OpenDocTypeEnum;
const { SUCCESS_DATA_SAVED, SUCCESS_UPDATED, ERROR } = Toastr;

@UntilDestroy()
@Component({
  selector: 'app-trucks-edit',
  templateUrl: './trucks-edit.component.html',
})
export class TrucksEditComponent extends TrucksEditService implements OnInit, OnDestroy {
  @Input() modal: IModal;

  @Input() dictionaries: IDictType = [];

  @Output() closeModal = new EventEmitter<void>();

  form: FormGroup<ITrucksForm> = new FormGroup<ITrucksForm>({
    id: new UntypedFormControl(null),
    code: new UntypedFormControl(null, [Validators.required, Validators.minLength(1)]),
    name: new UntypedFormControl(null, [Validators.required, Validators.minLength(1)]),
    statusId: new UntypedFormControl(null, [Validators.required]),
    description: new UntypedFormControl(null),
  });

  data: ITrucks = {};

  rowId: number;

  primaryTitle: string;

  formGroupConfig: Observable<IFormElements[]> = of(
    setFormConfig(this.formConfig, {
      prefix: `${this.translatePrefix}.form`,
      dictionaries: this.dictionaries,
    })
  );

  constructor(
    public httpClient: HttpClient,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    super(httpClient);
  }

  ngOnInit(): void {
    this.rowId = this.modal?.id ?? null;
    this.init();
  }

  ngOnDestroy(): void {
    this.resetForm();
  }

  init(): void {
    const { id } = this.modal || {};
    if (id) {
      this.loadModalData(id).then(() => {
        const statusId = this.dictionaries?.statusId?.find(el => el.displayName === this.data.status)?.id ?? null;
        this.form.patchValue({ ...this.data, statusId });
      });
    }
    this.setFormOpenType();
  }

  setFormOpenType(): void {
    if (this.modal.type === ADD) {
      this.form.reset();
    } else if (this.modal.type === SHOW) {
      this.form.disable();
    }
  }

  loadModalData(id?: number): Promise<void> {
    return new Promise(resolve => {
      this.getModalData(id)
        .pipe(
          untilDestroyed(this),
          tap(response => {
            this.data = response || {};
            resolve();
          }),
          shareReplay(1),
          catchError(() => of(false))
        )
        .subscribe();
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const { statusId, ...rest } = this.form.getRawValue();
      const status = this.dictionaries?.statusId?.find(el => el.id === statusId)?.displayName ?? null;
      this.saveModalData({ ...rest, status })
        .pipe(
          untilDestroyed(this),
          tap(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: this.translate.instant(this.modal.type === ADD ? SUCCESS_DATA_SAVED : SUCCESS_UPDATED),
            });
            this.onClose();
          }),
          catchError(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: this.translate.instant(ERROR),
            });
            return of(false);
          })
        )
        .subscribe();
    } else {
      this.form.markAllAsTouched();
    }
  }

  itemsConfig(data, name?: string): any {
    return {
      ...data,
      dictData: this.filterDict(this.dictionaries?.[name] ?? []),
    };
  }

  filterDict(dict: IDictType[]): IDictType[] {
    const { statusId } = this.form.value || {};
    const ids = this.getFilteredStatusIds(statusId);
    return dict.filter(el => ids.includes(el?.id as number));
  }

  getFilteredStatusIds(statusId: number): number[] {
    switch (statusId) {
      case 1:
        return [1, 2, 5];
      case 2:
        return [2, 3, 5];
      case 3:
        return [3, 4, 5];
      case 4:
        return [1, 4, 5];
      default:
        return [];
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  resetForm(): void {
    this.modal = { visible: false, type: undefined, id: undefined };
    this.data = {};
    this.form.reset();
  }
}
