import { IInput } from '../input/input.model';
import { InputTypes } from '../input/input.types';
import { ISelect } from '../select/select.model';
import { SelectType } from '../select/select.types';
import { FormElementsTypes } from './form-elements.types';

export type IFormElements = Omit<ISelect & IInput, 'type'> & {
  minRows?: number;
  maxRows?: number;
  header?: string;
  formCellType?: FormElementsTypes;
  config?: IFormElements;
  value?: string;
  type?: SelectType | FormElementsTypes | InputTypes;
  prefix?: string;
  dictKey?: string;
  placeholder?: string;
};

export const ConfigDefault = (): IFormElements => ({
  minRows: 2,
  maxRows: 7,
  step: 1,
  type: 'text',
});
