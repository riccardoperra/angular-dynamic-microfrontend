import {MicroserviceRequest} from 'fastify-platform';

export interface PlatformRegistry {
  services: MicroserviceRequest[];
}
