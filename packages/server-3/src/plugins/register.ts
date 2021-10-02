import fp from 'fastify-plugin';
import {fastifyMs} from 'fastify-ms';
import {fastifyPlatform} from 'fastify-platform';

export default fp(
  async (fastify) => {
    const name = 'client3';

    fastify.register(fastifyMs, {
      name
    });

    fastify.register(fastifyPlatform, {
      gatewayUrl: fastify.env.GATEWAY_URL,
      microservice: {
        url: 'http://localhost:10003',
        name,
        iconName: 'fab fa-angular',
        entryPoint: 'http://localhost:4202/remoteEntry.js',
        route: '/client3'
      }
    });

    fastify.ready().then(() => fastify.platform.connect());
  }
);
