import { inject, InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';

import { TeamApiResponse } from '@core/models';
import { ApiService } from '@core/services/api.service';

export const TEAMS_TOKEN = new InjectionToken<Observable<TeamApiResponse[]>>(
  'A stream with teams',
);

export const teamsPageProviders: Provider[] = [
  {
    provide: TEAMS_TOKEN,
    useFactory: teamsFactory,
  },
];

function teamsFactory(): Observable<TeamApiResponse[]> {
  const apiService = inject(ApiService);

  return apiService.getTeams();
}
