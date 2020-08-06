import {BindingKey} from '@loopback/context';
import { CommonService } from './services/common.service';
import { GatewayService } from './services/gateway.service';
import { RadioService } from './services';

export namespace ServiceBindings {

  export const COMMON_SERVICE = BindingKey.create<CommonService | undefined>(
    'common.service',
  );

  export const RADIO_SERVICE = BindingKey.create<RadioService | undefined>(
    'radio.service',
  );

  export const GATEWAY_SERVICE = BindingKey.create<GatewayService | undefined>(
    'gateway.service',
  );

}