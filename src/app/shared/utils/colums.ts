import { ColumnType, IColumn } from '@app/commons/table/table.models';

export function setColumnsConfig(
  config,
  params: {
    prefix?: string;
  } = {}
): IColumn[] {
  const { prefix } = params;
  return Object.keys(config).map((key, i) => {
    const { type: colType, sortField, sortable, visible } = config[key];
    const header = `${prefix ?? 'table'}.${key}`;
    const type: ColumnType = colType ?? 'Text';
    const column: IColumn = {
      id: i + 1,
      type,
      header,
      field: key,
      sortField: sortField ?? key,
      sortable: sortable !== undefined ? sortable : true,
      visible: visible ?? true,
      customizeValue: (val: any | any[]): any => val,
    };
    return column;
  });
}
