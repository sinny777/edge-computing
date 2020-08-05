import {BindingKey} from '@loopback/context';
import { CommonService } from './services/common.service';
import { GatewayService } from './services/gateway.service';

export namespace ServiceBindings {

  export const COMMON_SERVICE = BindingKey.create<CommonService | undefined>(
    'common.service',
  );

  export const GATEWAY_SERVICE = BindingKey.create<GatewayService | undefined>(
    'gateway.service',
  );

}