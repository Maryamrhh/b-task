/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppDataSource } from '@b-task/persistence'

async function bootstrap() {
  try {
    // Connect to the data source and run migrations before starting the app
    await AppDataSource.initialize();
    console.log('Data Source has been initialized');

    await AppDataSource.runMigrations();
    console.log('Migrations have been run successfully');
  } catch (error) {
    console.error('Error during Data Source initialization or migrations:', error);
    process.exit(1); // Exit the process if there's an error during migrations
  }
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
