import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

import * as dotenv from "dotenv";
import { ServiceBindings, UtilityBindings } from './keys';
import { CommonService, RuleService, RadioService, SecurityService } from './services';
import { SimulatorUtility } from './utils/simulator';

export {ApplicationConfig};

export class SecurityApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.bind(UtilityBindings.SIMULATOR_UTILITY).toClass(SimulatorUtility);
    this.bind(ServiceBindings.COMMON_SERVICE).toClass(CommonService);
    this.bind(ServiceBindings.RULE_SERVICE).toClass(RuleService);
    this.bind(ServiceBindings.RADIO_SERVICE).toClass(RadioService);
    this.bind(ServiceBindings.SECURITY_SERVICE).toClass(SecurityService);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
