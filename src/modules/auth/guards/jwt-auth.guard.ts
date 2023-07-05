import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
    console.log(info);

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
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

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
