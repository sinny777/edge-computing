
import {BindingKey} from '@loopback/context';
import { CommonServiceI } from './services/types';
import { GatewayService } from './services/gateway.service';
import { RadioService } from './services';

export namespace ServiceBindings {

  export const COMMON_SERVICE = BindingKey.create<CommonServiceI | undefined>(
    'common.service',
  );

  export const RADIO_SERVICE = BindingKey.create<RadioService | undefined>(
    'radio.service',
  );

  export const GATEWAY_SERVICE = BindingKey.create<GatewayService | undefined>(
    'gateway.service',
  );

}