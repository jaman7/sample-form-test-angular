import { DocOpenTypes } from '@app/shared/types/doc-types';
import { SelectMode } from '../select/select.model';
import { FormElementsTypes } from '../form-elements/form-elements.types';

export type ColumnType = 'Boolean' | 'Text' | 'Controls';

export type OperationButtonTypes = 'ADD' | 'SHOW' | 'EDIT' | 'DELETE';

export type MatchModeTypes = 'equals' | 'startsWith' | 'contains' | 'in' | 'notContains' | 'endsWith' | 'notEquals' | 'inputIn';

export interface ITableColumn {
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
  filter?: {
    filterHeader?: string;
    mode?: SelectMode;
    type?: FormElementsTypes;
    minWidth?: string;
    field?: string;
    format?: string;
    returnedFormat?: string;
    matchMode?: MatchModeTypes;
    step?: number;
    tooltip?: {
      placement?: string;
      title?: string;
    };
  };
}

export interface IRowSelected {
  openType?: DocOpenTypes | OperationButtonTypes;
  id?: number;
}
