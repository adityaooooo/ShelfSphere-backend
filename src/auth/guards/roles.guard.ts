<<<<<<< HEAD
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<
        string[]
      >(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredRoles) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    return requiredRoles.includes(
      user.role,
    );
  }
}
=======
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<
        string[]
      >(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredRoles) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    return requiredRoles.includes(
      user.role,
    );
  }
}
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
