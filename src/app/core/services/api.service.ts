import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';

import { FootballerApiResponse, TeamApiResponse } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private readonly _http = inject(HttpClient);

  private readonly _baseUrl = '/api';

  public getTeams(): Observable<TeamApiResponse[]> {
    return this._http.get<TeamApiResponse[]>(`${this._baseUrl}/teams/teams.json`)
      .pipe(first());
  }

  public getSquadsById(id: string): Observable<FootballerApiResponse[]> {
    return this._http.get<FootballerApiResponse[]>(`${this._baseUrl}/squads/${id}.json`)
      .pipe(first());
  }

}
