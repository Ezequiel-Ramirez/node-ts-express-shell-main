import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { MongoDatabase } from './data';

(async()=> {
  main();
})();


async function main() {

  await MongoDatabase.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  await server.start();
}