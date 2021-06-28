import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-35-169-188-58.compute-1.amazonaws.com',
  port: 5432,
  username: 'rjtmcvcoiizhzv',
  password: '0697166c2aa5cad32ca85ec1fcafb468e8043529ecd1b80e77c1d0406182bb34',
  database: 'd317018hoql2rn',
  autoLoadEntities: true,
  synchronize: true,
};
