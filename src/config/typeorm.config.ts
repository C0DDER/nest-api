import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'leha',
  password: 'root',
  database: 'taskmanagement',
  autoLoadEntities: true,
  synchronize: true,
};
