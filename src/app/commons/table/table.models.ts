import { DocOpenTypes } from '@app/shared/types/doc-types';

export type ColumnType = 'Boolean' | 'Text' | 'Controls';

export type OperationButtonTypes = 'ADD' | 'SHOW' | 'EDIT' | 'DELETE';

export interface IColumn {
  id?: number;
  header?: string;
  customHeader?: string;
  field?: string;
  sortField?: string;
  type?: ColumnType;
  translateKey?: string;
  sortable?: boolean;
  customClass?: string;
  customizeValue?(any?: any): void;
  visible?: boolean;
}

export interface IRowSelected {
  openType?: DocOpenTypes | OperationButtonTypes;
  id?: number;
}
