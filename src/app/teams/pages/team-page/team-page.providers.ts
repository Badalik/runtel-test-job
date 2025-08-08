import { inject, InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { FootballerApiResponse } from '@core/models';
import { ApiService } from '@core/services/api.service';

export const TEAM_TOKEN = new InjectionToken<Observable<FootballerApiResponse[]>>(
  'A stream with team',
);

export const teamPageProviders: Provider[] = [
  {
    provide: TEAM_TOKEN,
    useFactory: teamFactory,
  },
];

function teamFactory(): Observable<FootballerApiResponse[]> | [] {
  const route = inject(ActivatedRoute);
  const apiService = inject(ApiService);
  const id = route.snapshot.paramMap.get('id');

  return id !== null ? apiService.getSquadsById(id) : [];
}
