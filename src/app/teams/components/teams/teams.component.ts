import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TeamApiResponse } from '@core/models';

@Component({
  selector: 'app-teams',
  imports: [
    RouterLink,
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent {

  public teams = input.required<TeamApiResponse[] | null>();

}
