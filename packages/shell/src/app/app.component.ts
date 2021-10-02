import {Component} from '@angular/core';
import {Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {loadRemoteModule} from '@angular-architects/module-federation';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {NavItem} from './components/header/header.component';
import {EMPTY, Observable, of} from 'rxjs';

type MicroserviceRequest = {
  services: {
    name: string;
    iconName: string;
    route: string;
    entryPoint: string;
  }[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

  readonly config$ = this.http.get<MicroserviceRequest>('/platform').pipe(
    shareReplay({refCount: true, bufferSize: 1})
  );

  readonly routes$: Observable<NavItem[]> = this.config$
    .pipe(
      map(req => req.services.map(service => ({
        name: service.name,
        href: service.route
      }))),
      catchError(() => of([]))
    );

  constructor(private readonly router: Router,
              private readonly http: HttpClient) {
    this.http.get('/platform')
      .subscribe((request => {
        const routes = (request as MicroserviceRequest).services.map(service => {
          const route: Route = {
            path: service.route.replace('/', ''),
            loadChildren: () => loadRemoteModule({
              remoteEntry: service.entryPoint,
              remoteName: service.name,
              exposedModule: './Module'
            }).then(m => m.AppModule)
          };
          return route;
        });

        this.router.resetConfig(routes);

      }));
  }
}
