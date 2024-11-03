import { SortingFiltersTableParams } from '@app/commons/table/table.enums';
import { ITableColumn } from '@app/commons/table/table.models';
import { ParamsDTO } from '@app/core/http/http.model';
import { TableLazyLoadEvent } from 'primeng/table';

export function setTableParamsByColumnConfig(
  columnConfig: { [name: string]: ITableColumn },
  tableParams: ParamsDTO,
  event: TableLazyLoadEvent | any,
  deafultSort: string
): ParamsDTO {
  const tableParam = tableParams;
  const { ASC, DESC } = SortingFiltersTableParams;
  const { first, rows, sortOrder, sortField, filters } = event;
  const pageIndex = first / rows;
  const dataSortOrder = `${sortOrder === 1 ? ASC : DESC}`;
  tableParam.page = pageIndex;
  tableParam.sort = sortField ? `${sortField},${dataSortOrder}` : `${deafultSort}`;
  const configKeys = Object.keys(columnConfig).map(key => columnConfig[key]?.filter?.field ?? key);

  if (filters) {
    Object.entries(filters).forEach(([key, item]: [string, { value: any; matchMode: string }]) => {
      if (configKeys.includes(key)) {
        const { value } = item;
        if (value !== '' || value !== null) {
          const val = Array.isArray(value) ? [value[0], value[1]] : value;
          tableParam[key] = val;
          if (tableParam[key] === null || tableParam[key] === '') {
            delete tableParam[key];
          }
        } else {
          delete tableParam[key];
        }
      }
    });
  }

  return tableParam;
}
