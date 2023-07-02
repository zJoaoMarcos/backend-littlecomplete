import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdministratorModule } from '../administrator/administrator.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import * as dotenv from 'dotenv';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
dotenv.config();

@Module({
  imports: [AdministratorModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
