import { FastifyInstance } from "fastify";
import buildApp from "./app";

const startApp = async () => {
  const app: FastifyInstance = await buildApp()
  app.listen({ host: '0.0.0.0', port: app.config.PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Playground live on port - ${app.config.PORT}`)
  });
}

startApp()