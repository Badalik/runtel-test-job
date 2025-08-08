import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TeamComponent } from '@teams/components/team';

import { TEAM_TOKEN, teamPageProviders } from './team-page.providers';

@Component({
  selector: 'app-team-page',
  imports: [
    TeamComponent,
    AsyncPipe,
  ],
  providers: teamPageProviders,
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
})
export class TeamPageComponent {

  protected squad = inject(TEAM_TOKEN);

}
