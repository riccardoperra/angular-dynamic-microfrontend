## Angular dynamic micro-frontend example
> Simple angular micro-frontend + fastify micro-services example with dynamic module federation with [@angular/architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) plugin 


### Run locally

1. Install root dependencies (yarn must be used for workspaces)
```bash
yarn install
```

2. Install packages dependencies
```bash
lerna bootstrap
```

3. Build shared libraries
```bash
yarn build:shared
```

4. Start platform-server
```bash
yarn dev:main
```

5. Start micro-services
```bash
# Start server-2 angular client and fastify server 
yarn dev:server-2
yarn serve:client-2
# Start server-3 angular client and fastify server 
yarn dev:server-3
yarn serve:client-3
```

6. Start app-shell
```bash
yarn serve:shell
```

### Shared libs
- [fastify-ms](./libs/fastify-ms): Custom fastify plugin to integrate basic routes and info for this microservice example
- [fastify-platform](./libs/fastify-platform): Custom fastify plugin to integrate microservice information on system startup to the gateway server
### Packages
- [shell](./packages/shell): Angular shell to load micro frontend with module federation
- [client-2](./packages/client-2): Angular client for [server-2](./packages/server-2) microservice example
- [client-3](./packages/client-3): Angular client for [server-3](./packages/server-3) microservice example
- [server-2](./packages/server-2): Fastify server microservice example
- [server-3](./packages/server-3): Fastify server microservice example
