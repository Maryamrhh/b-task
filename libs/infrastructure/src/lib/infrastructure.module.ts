import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InfrastructureService } from './infrastructure.service';
import { JwtAuthGuard } from './guards/auth.guard';
import { EncryptionService } from './utils/encryption.util';
import { DecryptionService } from './utils/decryption.util';
import { PersistenceModule, User } from '@b-task/persistence';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    PersistenceModule,
  ],
  providers: [InfrastructureService, JwtAuthGuard],
  exports: [InfrastructureService, EncryptionService, DecryptionService],
})
export class InfrastructureModule {}
