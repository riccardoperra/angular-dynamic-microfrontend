import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Client} from '../app/models/client';


@Injectable({providedIn: 'root'})
export class ClientService {
  private readonly clientsSubject$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  readonly clients$ = this.clientsSubject$.asObservable();

  constructor() {
  }

  setClients(clients: Client[]) {
    this.clientsSubject$.next(clients);
  }
}
