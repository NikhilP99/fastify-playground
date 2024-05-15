import fastify, { FastifyInstance } from 'fastify'
import { DataSource } from 'typeorm';
import fjwt from '@fastify/jwt'

import fastifyEnvPlugin, { EnvConfig } from './plugins/fastify-env'
import postgresPlugin from './plugins/postgres-plugin';

import healthRoutes from './modules/health/health.routes';
import userRoutes from './modules/user/user.routes';
import UserService from './modules/user/user.service';
import RoleService from './modules/role/role.service';
import PermissionService from './modules/permission/permission.service';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvConfig;
    db: DataSource;
    userService: UserService;
    roleService: RoleService;
    permissionService: PermissionService;
  }
}

const buildApp = async (): Promise<FastifyInstance> => {
  const app = fastify({
    logger: true
  })

  // Load environment variables first
  await app.register(fastifyEnvPlugin)

  // Register DB
  await app.register(postgresPlugin)
  
  // Register plugins
  await app.register(fjwt, {
    secret: app.config.JWT_SECRET
  })

  // decorate services
  app.decorate('userService', new UserService(app.db))
  app.decorate('roleService', new RoleService(app.db))
  app.decorate('permissionService', new PermissionService(app.db))

  // Register routes
  app.register(healthRoutes, { prefix: '/health' })
  app.register(userRoutes, { prefix: '/user' })

  return app
}

export default buildApp