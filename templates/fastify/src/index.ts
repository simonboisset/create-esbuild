import fastify from 'fastify';

const app = fastify();
// Api routes
app.get('/api', async (_, res) => {
  res.send({ hello: 'word' });
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info('Server listing');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
