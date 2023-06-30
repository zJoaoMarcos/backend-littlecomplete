import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdministratorModule } from '../administrator/administrator.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    AdministratorModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
