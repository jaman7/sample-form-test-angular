import { Injectable } from '@angular/core';
import { IColumn } from '@app/commons/table/table.models';
import { HttpService } from '@app/core';
import { Observable } from 'rxjs';
import { ParamsDTO } from '@app/core/http/http.model';
import { ITrucks } from './trucks.model';

@Injectable({
  providedIn: 'root',
})
export abstract class TrucksService extends HttpService {
  getData(params: ParamsDTO): Observable<ITrucks[]> {
    return this.get(`/trucks`, { params });
  }

  deleteData(id: number): Observable<any> {
    return this.delete(`/trucks/${id}`);
  }

  columnConfig: { [name: string]: IColumn } = {
    code: {},
    name: {},
    status: {},
    description: {},
  };
}
