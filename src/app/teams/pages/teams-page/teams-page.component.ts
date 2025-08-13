import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TeamsComponent } from '@teams/components/teams';

import { ContainerComponent } from '@shared/components/container';
import { HeadingComponent } from '@shared/components/heading';

import { TEAMS_TOKEN, teamsPageProviders } from './teams-page.providers';

@Component({
  selector: 'app-teams-page',
  imports: [
    ContainerComponent,
    HeadingComponent,
    TeamsComponent,
    AsyncPipe,
  ],
  providers: teamsPageProviders,
  templateUrl: './teams-page.component.html',
  styleUrl: './teams-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsPageComponent {

  protected teams$ = inject(TEAMS_TOKEN);

}
