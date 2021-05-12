import {BindingKey} from '@loopback/context';
import { CommonServiceI, RuleServiceI, RadioServiceI, GatewayServiceI } from './services/types';
import { SimulatorUtilityI } from './utils';

export namespace ServiceBindings {

  export const COMMON_SERVICE = BindingKey.create<CommonServiceI | undefined>(
    'common.service',
  );

  export const RULE_SERVICE = BindingKey.create<RuleServiceI | undefined>(
    'rule.service',
  );

  export const RADIO_SERVICE = BindingKey.create<RadioServiceI | undefined>(
    'radio.service',
  );

  export const GATEWAY_SERVICE = BindingKey.create<GatewayServiceI | undefined>(
    'gateway.service',
  );

}

export namespace UtilityBindings {

  export const SIMULATOR_UTILITY = BindingKey.create<SimulatorUtilityI | undefined>(
    'simulator.utility',
  );
  
}