import { Administrator } from '@/domain/administrators/entity/administrator';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdministratorService } from '../administrator/administrator.service';

@Injectable()
export class AuthService {
  constructor(
    private administratorService: AdministratorService,
    private jwtService: JwtService,
  ) {}

  async signIn(administrator: Administrator) {
    const tokens = await this.getTokens(
      administrator.email,
      administrator.username,
    );

    return {
      id: administrator.id,
      username: administrator.username,
      displayName: administrator.displayName,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
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
          expiresIn: '10s',
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

    const tokens = await this.getTokens(admin.email, admin.username);

    return tokens;
  }

  async getCurrentAdmin(email: string) {
    const admin = await this.administratorService.findByEmail(email);

    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }

    admin.password = undefined;

    return admin;
  }
}
