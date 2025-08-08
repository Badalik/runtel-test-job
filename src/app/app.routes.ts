import { Routes } from '@angular/router';

import { TeamPageComponent } from '@teams/pages/team-page';
import { TeamsPageComponent } from '@teams/pages/teams-page';

import { LayoutComponent } from './layout/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'teams',
        component: TeamsPageComponent,
      },
      {
        path: 'teams/:id',
        component: TeamPageComponent,
      },
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full'  },
];
