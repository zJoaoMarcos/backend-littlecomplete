import { Administrator } from '@/domain/administrators/entity/administrator';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdministratorService } from '../administrator/administrator.service';
import { AuthToken } from './models/AuthToken';
import { UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private administratorService: AdministratorService,
    private jwtService: JwtService,
  ) {}

  signIn(administrator: Administrator): AuthToken {
    const payload: UserPayload = {
      sub: administrator.username,
      email: administrator.email,
      displayName: administrator.displayName,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
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
}
