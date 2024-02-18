import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      // const authHeader = req.headers.authorization;
      // const bearer = authHeader.split(' ')[0];
      // const token = authHeader.split(' ')[1];

      // // Проверка, если пришел пустой header authorizarion или не указан тип токена, то возвращаем ошибку
      // if (bearer !== 'Bearer' || !token) {
      //   throw new UnauthorizedException('Пользователь не авторизован');
      // }

      // Реализация аутентификации через тело запроса
      const token = req.body.apiToken;
      if (!token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }
}
