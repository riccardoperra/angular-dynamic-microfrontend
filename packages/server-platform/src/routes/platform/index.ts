import {FastifyPluginAsync} from 'fastify';
import {MicroserviceRequest} from 'fastify-platform';

const platform: FastifyPluginAsync = (async (fastify) => {
  fastify.get('/', async () => {
    return fastify.platformServer.getAll();
  });

  fastify.put<{
    Body: MicroserviceRequest
  }>('/', async request => {
    return await fastify.platformServer.add(request.body);
  });

  fastify.delete<{
    Querystring: { name: string }
  }>('/', async request => {
    return await fastify.platformServer.remove(request.query.name);
  });
});

export default platform;
