import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { AuthService } from './auth.service';

@ApiTags('Регистрация и авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Успешная авторизация
  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь авторизован',
    schema: {
      example: {
        fio: 'Superman',
        apiToken: '1234567890',
      },
    },
  })
  // Неверные логин или пароль
  @ApiResponse({
    status: 401,
    description: 'Пользователь авторизован',
    schema: {
      example: {
        message: 'Неверные логин или пароль',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Post('login')
  login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }
  // Успешная регистрация
  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь зарегистрирован',
    schema: {
      example: {
        fio: 'Superman',
        apiToken: '1234567890',
      },
    },
  })
  // Пользователь уже существует
  @ApiResponse({
    status: 400,
    description: 'Пользователь авторизован',
    schema: {
      example: {
        message: 'Пользователь с таким логином уже существует',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Post('registration')
  registration(@Body() userDto: UserCreateDto) {
    return this.authService.registration(userDto);
  }
}
