## Angular dynamic micro-frontend example
> Simple angular micro-frontend + fastify micro-services example with dynamic module federation


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
