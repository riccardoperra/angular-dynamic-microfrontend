import {loadRemoteModule} from '@angular-architects/module-federation';
import {APP_INITIALIZER, FactoryProvider} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {PlatformApiService} from '../../services/platform.service';
import {catchError, of, tap} from 'rxjs';
import {Client} from '../models/client';
import {Router} from '@angular/router';


export const clientInitializer = (): FactoryProvider => {
  return {
    provide: APP_INITIALIZER,
    useFactory: (clientService: ClientService, platformService: PlatformApiService, router: Router) => {
      return () => platformService.getClients()
        .pipe(
          catchError(() => of([] as Client[])),
          tap((clients) => {
            clientService.setClients(clients);
            const routes = clients.map(service => ({
              path: service.route.replace('/', ''),
              loadChildren: () => loadRemoteModule({
                remoteEntry: service.entryPoint,
                remoteName: service.name,
                exposedModule: './Module'
              }).then(m => m.AppModule)
            }));
            router.config.push(...routes);
          })
        );
    },
    deps: [ClientService, PlatformApiService, Router],
    multi: true
  };
};
