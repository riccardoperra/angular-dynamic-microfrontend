import fp from 'fastify-plugin';
import {fastifyMs} from 'fastify-ms';
import {fastifyPlatform} from 'fastify-platform';

// import got from 'got';
export default fp(
  async (fastify) => {
    const name = 'app-2';

    fastify.register(fastifyMs, {
      name
    });

    fastify.register(fastifyPlatform, {
      gatewayUrl: fastify.env.GATEWAY_URL,
      microservice: {
        name,
        iconName: 'fa-users',
        entryPoint: 'http://localhost:4201/remoteEntry.js'
        route: '/app-2'
      }
    });

    fastify.ready().then(() => fastify.platform.connect());
  }
);
