// SPDX-License-Identifier: Apache-2.0
import { type FastifyInstance } from 'fastify';
import {
  getAccountConditionsHandler,
  getConditionHandler,
  handleHealthCheck,
  postConditionHandlerAccount,
  postConditionHandlerEntity,
  putRefreshCache,
  reportRequestHandler,
  updateAccountConditionExpiryDateHandler,
  updateEntityConditionExpiryDateHandler,
} from './app.controller';
import { SetOptionsBody, SetOptionsParams, SetOptionsBodyAndParams } from './utils/schema-utils';

async function Routes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/', handleHealthCheck);
  fastify.get('/health', handleHealthCheck);
  fastify.get('/v1/admin/reports/getreportbymsgid', SetOptionsParams(reportRequestHandler, 'messageIDSchema'));
  fastify.get('/v1/admin/event-flow-control/entity', SetOptionsParams(getConditionHandler, 'queryEntityConditionSchema'));
  fastify.get('/v1/admin/event-flow-control/account', SetOptionsParams(getAccountConditionsHandler, 'queryAccountConditionSchema'));
  fastify.post('/v1/admin/event-flow-control/entity', SetOptionsBody(postConditionHandlerEntity, 'entityConditionSchema'));
  fastify.post('/v1/admin/event-flow-control/account', SetOptionsBody(postConditionHandlerAccount, 'accountConditionSchema'));
  fastify.put(
    '/v1/admin/event-flow-control/entity',
    SetOptionsBodyAndParams(updateEntityConditionExpiryDateHandler, 'expireDateTimeSchema', 'expireEntityConditionSchema'),
  );
  fastify.put(
    '/v1/admin/event-flow-control/account',
    SetOptionsBodyAndParams(updateAccountConditionExpiryDateHandler, 'expireDateTimeSchema', 'expireAccountConditionSchema'),
  );
  fastify.put('/v1/admin/event-flow-control/cache', putRefreshCache);
}

export default Routes;
