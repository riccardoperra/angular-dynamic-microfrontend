import fp from 'fastify-plugin';
import fastifyHealthcheck from 'fastify-healthcheck';

export interface Microservice<Metadata extends Record<string, unknown> = {}> {
  name: string;
  metadata?: Metadata;
}

export interface MicroserviceData {
  name: string;
}

export const fastifyMs = fp(async (fastify, options: Microservice) => {
  fastify.register(fastifyHealthcheck, {exposeUptime: true});

  fastify.ready(() => {
    fastify.log.info(`[Microservice] ${options.name} is ready`);
    fastify.log.info(`\n${fastify.printRoutes()}`);
  });

  fastify.decorate('microservice', {name: options.name});
}, {name: 'fastifyMs'});

declare module 'fastify' {
  export interface FastifyInstance {
    microservice: MicroserviceData;
  }
}
