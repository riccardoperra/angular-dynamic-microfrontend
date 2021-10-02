import {join} from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import {FastifyPluginAsync} from 'fastify';
import fastifyEnv from 'fastify-env';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  fastify.register(
    fastifyEnv, {
      confKey: 'env',
      schema: {
        type: 'object',
        required: ['GATEWAY_URL'],
        properties: {
          GATEWAY_URL: {type: 'string'}
        }
      },
    },
  );

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  });
};

declare module 'fastify' {
  interface FastifyInstance {
    env: {
      GATEWAY_URL: string
    };
  }
}


export default app;
export {app};
