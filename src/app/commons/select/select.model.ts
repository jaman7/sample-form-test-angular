import { SelectType } from './select.types';

export interface ISelect {
  formControlName?: string;
  size?: 'large' | 'small' | 'default';
  mode?: 'multiple' | 'tags' | 'default';
  tooltipTitle?: string;
  placeholder?: string;
  labelTitle?: string;
  dictData?: any[];
  type?: SelectType;
  dictName?: string;
  defaultValue?: any;
  dafaultDropDownClass?: string;
}

export type SelectMode = 'multiple' | 'tags' | 'default';

export const ConfigDefault = (): ISelect => ({
  size: 'default',
  mode: 'default',
  dafaultDropDownClass: 'select-component',
  dictData: [],
});
