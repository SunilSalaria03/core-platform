// User guard
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/user.decorator';
import { UserRole } from '../enums/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // check if the roles are defined
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) return true;

    // get the request
    const req = context.switchToHttp().getRequest<{ user?: { role?: UserRole } }>();
    const user = req.user;

    if (!user) throw new ForbiddenException('User not found in request');

    // check if the user has the required role
    if (!roles.includes(user.role as UserRole)) {
      throw new ForbiddenException('Access denied for this role');
    }

    return true;
  }
}
