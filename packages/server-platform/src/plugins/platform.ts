import fp from 'fastify-plugin';
import {PlatformRegistry} from '../models/platform';
import {MicroserviceRequest} from 'fastify-platform';
import got from 'got';

interface Platform {
  getAll: () => PlatformRegistry;
  add: (req: MicroserviceRequest) => Promise<PlatformRegistry>;
  remove: (req: string) => Promise<void>;
}

export default fp(async (fastify, opts) => {
  const registry: Map<string, MicroserviceRequest> = new Map<string, MicroserviceRequest>();

  fastify.decorate('platformServer', {
    getAll: async () => {
      const urlStatus = '/health';
      const results = await Promise.all(
        Array.from(registry.values())
          .map(service => got.get(`${service.url}${urlStatus}`)
            .then(() => service)
            .catch(() => null))
          .filter(k => !!k)
      );
      return {services: results} as PlatformRegistry;
    },
    add: async (request: MicroserviceRequest) => {
      if (!registry.has(request.name)) {
        registry.set(request.name, request);
      } else {
        registry.set(request.name, {...registry.get(request.name), ...request});
      }

      return Array.from(registry.values());
    },
    remove: async (serviceName: string) => {
      if (registry.has(serviceName)) {
        registry.delete(serviceName);
      }
      return Array.from(registry.values());
    },
  });
}, {name: 'platform'});

declare module 'fastify' {
  export interface FastifyInstance {
    platformServer: Platform;
  }
}
