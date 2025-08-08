import { Component, input, OnInit, ViewChild } from '@angular/core';
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

import { TableColumn } from '@core/models';

import { TableFilterComponent } from '@shared/components/table-filter';

// interface DataSourceData { [p: string]: string | number | null }
interface DataSourceData { [p: string]: any }

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
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {

  @ViewChild(MatSort, { static: true })
  private _sort!: MatSort;

  public columns = input.required<TableColumn[]>();

  public data = input.required<DataSourceData[]>();

  protected displayedColumns: string[] = [];

  protected dataSource!: MatTableDataSource<DataSourceData>;

  public ngOnInit(): void {
    this.displayedColumns = this.columns().map((p) => p.name);
    this.dataSource = new MatTableDataSource(this.data());
    this.dataSource.sort = this._sort;

    this.dataSource.filterPredicate = (data: DataSourceData, filter: string) => {
      const parsedFilter: { [p: string]: string | null } = JSON.parse(filter);

      return Object.keys(parsedFilter).every((key) => {
        const filterValue = parsedFilter[key];

        if (filterValue !== null) {
          const dataValue = data[key];

          return dataValue !== null ? dataValue.toString().toLowerCase().includes(filterValue) : false;
        }

        return true;
      });
    };
  }

  protected changeFilter(value: Partial<{ [p: string]: string | null }>): void {
    this.dataSource.filter = JSON.stringify(value);
  }

}
