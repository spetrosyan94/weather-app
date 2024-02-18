import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { UserLoginDto } from 'src/user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Авторизация
  async login(userDto: UserLoginDto) {
    const user = await this.validateUser(userDto);
    return { fio: user.fio, apiToken: user.apiToken };
    // return this.generateToken(user);
  }

  // Регистрация
  async registration(userDto: UserCreateDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    // Проверка, зарегистрирован ли пользователь
    if (candidate) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }
    // Хеширование пароля
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    // Сохранение пользователя в базе данных
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    // Возвращаем сгенинированный токен
    return this.generateToken(user);
  }

  // Генерация токена
  private async generateToken(user: User) {
    const payload = {
      login: user.login,
      id: user.id,
      fio: user.fio,
    };
    const apiToken = await this.jwtService.sign(payload);

    // Добавление токена в объект пользователя в БД
    await this.userService.addApiTokenUser(user, apiToken);

    return { fio: user.fio, apiToken: apiToken };
  }

  // Валидация пользователя
  private async validateUser(userDto: UserLoginDto) {
    const user = await this.userService.getUserByLogin(userDto.login);

    // Проверка существует ли пользователь
    if (!user) {
      throw new UnauthorizedException('Неверные логин или пароль');
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    // Проверка верно указан ли пароль
    if (!passwordEquals) {
      throw new UnauthorizedException('Неверные логин или пароль');
    }

    return user;
  }
}
