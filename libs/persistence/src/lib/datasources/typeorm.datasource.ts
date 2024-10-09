import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or 'mysql', 'sqlite', etc.
  host: process.env['DB_HOST'] || 'localhost',
  port: Number(process.env['DB_PORT']) || 5432,
  username: process.env['DB_USER'] || 'admin',
  password: process.env['DB_PASSWORD'] || 'adminpw',
  database: process.env['DB_NAME'] || 'admindb',
  entities: [User],
  synchronize: true, // Use with caution in production; auto-creates tables
  logging: true, // Set to false in production
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true
});
