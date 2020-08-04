import {BindingKey} from '@loopback/context';
import { GatewayService } from './services/gateway.service';

export namespace ServiceBindings {
  export const GATEWAY_SERVICE = BindingKey.create<GatewayService | undefined>(
    'gateway.service',
  );
}