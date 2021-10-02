import {Component} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {NavItem} from './components/header/header.component';
import {Observable, of} from 'rxjs';
import {ClientService} from 'src/services/client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

  readonly routes$: Observable<NavItem[]> = this.clientService.clients$
    .pipe(
      map(clients =>
        clients.map(client => ({
          name: client.name,
          href: client.route
        }))),
      catchError(() => of([]))
    );

  constructor(private readonly clientService: ClientService) {
  }
}
