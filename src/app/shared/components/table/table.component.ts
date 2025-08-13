import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';

import { ColumnType } from '@core/enums';
import { TableColumn } from '@core/models';

import { TableFilterComponent } from '@shared/components/table-filter';

interface DataSourceData { [p: string]: string | number | null | Date }

interface PreparedDataSourceData {
  id: number;
  data: DataSourceData;
  edit: boolean;
}

@Component({
  selector: 'app-table',
  imports: [
    TableFilterComponent,
    MatTable,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortModule,
    MatIcon,
    MatIconButton,
    MatFormField,
    FormsModule,
    MatInput,
    DatePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

  @ViewChild(MatSort, { static: true })
  private _sort!: MatSort;

  public columns = input.required<TableColumn[]>();

  public data = input.required<DataSourceData[]>();

  public editable = input<boolean>(false);

  protected displayedColumns: string[] = [];

  protected dataSource!: MatTableDataSource<PreparedDataSourceData>;

  protected columnType = ColumnType;

  public ngOnInit(): void {
    const preparedData = this.data().map((p, i) => ({ id: i, data: p, edit: false }));

    this.displayedColumns = this.columns().map((p) => p.name);
    this.dataSource = new MatTableDataSource(preparedData);
    this.dataSource.sort = this._sort;

    if (this.editable()) {
      this.displayedColumns.push('edit');
    }

    this.dataSource.filterPredicate = (row: PreparedDataSourceData, filter: string) => {
      const parsedFilter: { [p: string]: string | null } = JSON.parse(filter);

      return Object.keys(parsedFilter).every((key) => {
        const filterValue = parsedFilter[key];

        if (filterValue !== null) {
          const dataValue = row.data[key];

          return dataValue !== null ? dataValue.toString().toLowerCase().includes(filterValue) : false;
        }

        return true;
      });
    };
  }

  protected changeFilter(value: Partial<{ [p: string]: string | null }>): void {
    this.dataSource.filter = JSON.stringify(value);
  }

  protected editRow(row: PreparedDataSourceData): void {
    row.edit = true;
  }

  protected saveRow(row: PreparedDataSourceData): void {
    row.edit = false;
  }

}
