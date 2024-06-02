import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFormElements } from '@app/commons/form-elements/form-elements.models';
import { HttpService } from '@app/core';
import { Observable } from 'rxjs';
import { ITrucks } from '../trucks.model';

@Injectable({
  providedIn: 'root',
})
export abstract class TrucksEditService extends HttpService {
  translatePrefix = 'modal';

  trucksEp = '/trucks';

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  getModalData(id: number): Observable<ITrucks> {
    return this.get<any>(`${this.trucksEp}/${id}`);
  }

  saveModalData(data: ITrucks): Observable<ITrucks> {
    return data?.id ? this.put(`${this.trucksEp}/${data.id}`, data) : this.post(this.trucksEp, data);
  }

  formConfig: { [name: string]: IFormElements } = {
    code: {},
    name: {},
    statusId: { config: { formCellType: 'select' } },
    description: { config: { formCellType: 'text-area', minRows: 2, maxRows: 6 } },
  };
}
