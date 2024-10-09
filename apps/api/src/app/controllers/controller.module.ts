import { Module } from '@nestjs/common';
import { UserController } from './users/user.controller';
import { CityController } from './cities/cities.controller';
import { UserService } from './users/user.service';
import { CityService } from './cities/cities.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PersistenceModule } from '@b-task/persistence';
import { JwtStrategy } from '@b-task/infrastructure';

@Module({
  imports: [
    JwtModule.register({}),
    PersistenceModule,
  ],
  controllers: [UserController, CityController],
  providers: [UserService, CityService, JwtService, JwtStrategy],
})
export class ControllerModule {}
