import { FormElementsTypes } from '@app/commons/form-elements/form-elements.types';
import { ColumnType, ITableColumn } from '@app/commons/table/table.models';

export function setColumnsConfig(
  config,
  params: {
    prefix?: string;
  } = {}
): ITableColumn[] {
  const { prefix } = params;
  return Object.keys(config).map((key, i) => {
    const { type: colType, sortField, sortable, visible, filter } = config[key];

    const filterType: FormElementsTypes = 'text';

    switch (colType as ColumnType) {
      default:
        break;
    }

    const header = `${prefix ?? 'table'}.${key}`;
    const type: ColumnType = colType ?? 'Text';
    const column: ITableColumn = {
      id: i + 1,
      type,
      header,
      field: key,
      sortField: sortField ?? key,
      sortable: sortable !== undefined ? sortable : true,
      visible: visible ?? true,
      filter: { ...filter, type: filter?.type ?? filterType },
      customizeValue: (val: any | any[]): any => val,
    };
    return column;
  });
}
