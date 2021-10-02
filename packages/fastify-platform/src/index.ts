import fp from 'fastify-plugin';
import got from 'got';

export type MicroserviceRequest = {
  name: string;
  iconName: string;
  route: string;
  entryPoint: string;
}

export interface FastifyPlatformOptions {
  gatewayUrl: string;
  microservice: MicroserviceRequest;
}

export interface PlatformConnector {
  connect: () => Promise<boolean>;
  disconnect: () => Promise<boolean>;
}

export const fastifyPlatform = fp(async (fastify, options: FastifyPlatformOptions) => {
  fastify.decorate('platform', {
    connect: () => got.put(`${options.gatewayUrl}/platform`, {json: options.microservice}),
    disconnect: () => got.delete(`${options.gatewayUrl}/platform`, {json: options.microservice})
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    platform: PlatformConnector;
  }
}
