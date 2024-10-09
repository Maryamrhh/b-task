import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controllers/controller.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '@b-task/infrastructure';

@Module({
  imports: [
    ControllerModule,
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtService],
})
export class AppModule {}
