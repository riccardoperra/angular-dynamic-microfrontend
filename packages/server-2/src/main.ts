import fastify from 'fastify';
import {app} from './app';

const boostrap = async () => {
  const server = fastify();
  server.register(app);
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

boostrap();
