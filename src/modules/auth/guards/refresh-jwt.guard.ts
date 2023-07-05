import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshJwtGuard extends AuthGuard('refresh-jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (info?.message === 'invalid signature') {
      throw new UnauthorizedException('token.invalid');
    }
    if (info?.message === 'No auth token') {
      throw new UnauthorizedException('token.invalid');
    }
    if (info?.message === 'invalid token') {
      throw new UnauthorizedException('token.invalid');
    }
    if (info?.message === 'jwt expired') {
      throw new UnauthorizedException('token.expired');
    }

    return super.handleRequest(err, user, info, context, status);
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    const canActivatePromise = canActivate as Promise<boolean>;

    return canActivatePromise.catch((error) => {
      if (error?.message) {
        throw new UnauthorizedException(error?.message);
      }

      throw new UnauthorizedException();
    });
  }
}
