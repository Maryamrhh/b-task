import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './lib/entities/user.entity.js';
import { City } from './lib/entities/city.entity.js';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres', 
  host: process.env['DB_HOST'] || 'localhost',
  port: Number(process.env['DB_PORT']) || 5432,
  username: process.env['DB_USER'] || 'admin',
  password: process.env['DB_PASSWORD'] || 'adminpw',
  database: process.env['DB_NAME'] || 'admindb',
  entities: [User, City],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
};

export default new DataSource(dataSourceConfig);
