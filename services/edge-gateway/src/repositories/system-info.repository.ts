import {DefaultCrudRepository} from '@loopback/repository';
import {SystemInfo, SystemInfoRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SystemInfoRepository extends DefaultCrudRepository<
  SystemInfo,
  typeof SystemInfo.prototype.id,
  SystemInfoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(SystemInfo, dataSource);
  }
}
