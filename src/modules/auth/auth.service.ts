import { Administrator } from '@/domain/administrators/entity/administrator';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdministratorService } from '../administrator/administrator.service';
import { AuthTokens } from './models/AuthTokens';

@Injectable()
export class AuthService {
  constructor(
    private administratorService: AdministratorService,
    private jwtService: JwtService,
  ) {}

  async signIn(administrator: Administrator): Promise<AuthTokens> {
    const tokens = await this.getTokens(
      administrator.id,
      administrator.username,
    );

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async validateUser(email: string, password: string) {
    const admin = await this.administratorService.findByEmail(email);

    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (isPasswordValid) {
        return {
          ...admin,
          password: undefined,
        };
      }
    }

    throw new Error('Email address or password provided is incorrcet.');
  }

  async getTokens(adminEmail: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: adminEmail,
          username,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: adminEmail,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_KEY,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(adminEmail: string) {
    const admin = await this.administratorService.findByEmail(adminEmail);

    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(admin.id, admin.username);

    return tokens;
  }
}
