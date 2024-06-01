import { IFormElements } from '@app/commons/form-elements/form-elements.models';
import { IDictType } from '../models/dict-type';

export function setFormConfig(
  formConfig,
  params: {
    prefix?: string;
    dictionaries?: IDictType;
  } = {}
): IFormElements[] {
  return Object.keys(formConfig).map(key => {
    const { prefix, dictionaries } = params;
    const { config } = formConfig[key];
    const {
      placeholder,
      type,
      formCellType,
      step,
      precision,
      min,
      max,
      dictName,
      dictData,
      header,
      headerKey,
      minRows,
      maxRows,
      value,
      dictKey,
    } = config || {};

    return {
      formControlName: key,
      type,
      config: {
        ...(config ?? {}),
        prefix,
        header: header ?? `${prefix}.${headerKey ?? key}`,
        formCellType: !value ? formCellType ?? 'input' : null,
        order: true,
        placeholder: placeholder ?? `${prefix}.${headerKey ?? key}`,
        step: step ?? 1,
        precision: precision ?? 0,
        min: min ?? 0,
        max: max ?? 100000000000,
        minRows: minRows ?? 2,
        maxRows: maxRows ?? 6,
        dictName: dictName ?? key,
        dictData: dictData ?? dictionaries?.[dictName ?? key] ?? [],
        dictKey,
      },
    };
  });
}
