import { SystemInfoSchema } from './specs/gatewaay-controller.spec';
import { SystemInfo } from '../models/system-info.model';
import {Request, RestBindings, get, ResponseObject, post, requestBody, getModelSchemaRef, api} from '@loopback/rest';
import {inject} from '@loopback/core';
import { ServiceBindings } from '../keys';
import { GatewayService } from '../services';
import { SystemInfoRepository } from '../repositories';
import { repository } from '@loopback/repository';

/**
 * OpenAPI response for sysInfo()
 */
const SYS_RESPONSE: ResponseObject = {
  description: 'System Info Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'SysResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

@api({basePath: '/api/gateway', paths: {}})
export class GatewayController {
  constructor(
      @inject(RestBindings.Http.REQUEST) private req: Request,
      @inject(ServiceBindings.GATEWAY_SERVICE) private gatewayService: GatewayService,
      @repository(SystemInfoRepository)
      private systemInfoRepository : SystemInfoRepository,
    ) {}

  // Map to `GET /system`
  @get('/ping', {
    responses: {
      '200': SYS_RESPONSE,
    },
  })
  ping(): object {
    const valueObject = {
      cpu: '*',
      osInfo: 'platform, release',
      system: 'model, version, serial, uuid, sku',
      mem: 'total, free, used',
      battery: 'hasbattery, percent'
    }
    return this.gatewayService.getSystemInformation(valueObject);
  }


  @post('/system', {
    responses: {
      '200': {
        description: 'System Information',
        content: {'application/json': {schema: getModelSchemaRef(SystemInfo)}},
      },
    },
  })
  async sysInfo(
    @requestBody({
      content: {
        'application/json': {
          content: {'application/json': {schema: SystemInfoSchema}},
        },
      },
    })
    payload: typeof SystemInfoSchema,
  ): Promise<SystemInfo> {
    console.log('IN getSystemInformation with Payload: >>> ', payload);
    let systemInfo = await this.gatewayService.getSystemInformation(payload);
    systemInfo = await this.systemInfoRepository.create(systemInfo);
    console.log(systemInfo);
    return systemInfo;    
  }


}
