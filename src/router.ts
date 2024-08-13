// SPDX-License-Identifier: Apache-2.0
import { type FastifyInstance } from 'fastify';
import { postConditionHandler, reportRequestHandler, handleHealthCheck, getConditionHandler } from './app.controller';
import { SetOptionsBody, SetOptionsParams } from './utils/schema-utils';

async function Routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/', handleHealthCheck);
  fastify.get('/health', handleHealthCheck);
  fastify.get('/v1/admin/reports/getreportbymsgid', SetOptionsParams(reportRequestHandler, 'messageIDSchema'));
  fastify.post('/v1/admin/event-flow-control/entity', SetOptionsBody(postConditionHandler, 'entityConditionSchema'));
  fastify.get('/v1/admin/event-flow-control/entity', SetOptionsBody(getConditionHandler, 'queryEntityCondition'));
}

export default Routes;
