import { ColumnType } from '@core/enums';

export interface TableColumn {
  name: string;
  label: string;
  type: ColumnType;
  additional?: string;
}
