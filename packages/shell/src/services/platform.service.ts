import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_TOKEN, AppApi} from '../app/tokens/api';
import {map, Observable} from 'rxjs';
import {Client} from '../app/models/client';

@Injectable({providedIn: 'root'})
export class PlatformApiService {
  constructor(
    @Inject(API_TOKEN) private readonly api: AppApi,
    private readonly httpClient: HttpClient) {
  }

  getClients(): Observable<Client[]> {
    return this.httpClient.get<{ services: Client[] }>(this.api.getPlatformList).pipe(
      map(response => response.services)
    );
  }
}
