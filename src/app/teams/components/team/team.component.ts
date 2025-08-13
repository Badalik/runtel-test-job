import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ColumnType } from '@core/enums';
import { FootballerApiResponse, TableColumn } from '@core/models';

import { ContainerComponent } from '@shared/components/container';
import { TableComponent } from '@shared/components/table';

@Component({
  selector: 'app-team',
  imports: [
    TableComponent,
    ContainerComponent,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {

  public squad = input.required<FootballerApiResponse[] | null>();

  protected columns: TableColumn[] = [
    { name: 'number', label: 'Номер', type: ColumnType.INTEGER },
    { name: 'name', label: 'Имя', type: ColumnType.TEXT },
    { name: 'position', label: 'Позиция', type: ColumnType.TEXT },
    { name: 'birth', label: 'Родился', type: ColumnType.DATE },
    { name: 'nationality', label: 'Национальность', type: ColumnType.TEXT },
    { name: 'height', label: 'Рост', type: ColumnType.INTEGER, additional: 'см' },
    { name: 'games', label: 'Игр', type: ColumnType.INTEGER },
    { name: 'goals', label: 'Голов', type: ColumnType.INTEGER },
    { name: 'assists', label: 'Гол. пасов', type: ColumnType.INTEGER },
    { name: 'cost', label: 'Стоимость', type: ColumnType.FLOAT, additional: ' млн. €' },
  ];

}
