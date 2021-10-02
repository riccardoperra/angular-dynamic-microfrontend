import fp from 'fastify-plugin';
import {fastifyMs} from 'fastify-ms';
import {fastifyPlatform} from 'fastify-platform';

// import got from 'got';
export default fp(
  async (fastify) => {
    const name = 'client2';

    fastify.register(fastifyMs, {
      name
    });

    fastify.register(fastifyPlatform, {
      gatewayUrl: fastify.env.GATEWAY_URL,
      microservice: {
        url: 'http://localhost:10002',
        name,
        iconName: 'fa-users',
        entryPoint: 'http://localhost:4201/remoteEntry.js',
        route: '/client2'
      }
    });

    fastify.ready().then(() => fastify.platform.connect());
  }
);
