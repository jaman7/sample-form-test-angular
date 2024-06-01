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

export const ConfigDefault = (): ISelect => ({
  size: 'default',
  mode: 'default',
  dafaultDropDownClass: 'select-component',
  dictData: [],
});
