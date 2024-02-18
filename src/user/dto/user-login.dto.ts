import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UserLoginDto {
  // ЛОГИН
  @ApiProperty({ example: 'Superman', description: 'Логин пользователя' })
  //  Валидация
  @IsNotEmpty({ message: 'Поле login не может быть пустым' })
  @IsString({ message: 'Поле login должно быть строкой' })
  login: string;

  // ПАРОЛЬ
  @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
  //  Валидация
  @IsNotEmpty({ message: 'Поле пароль не может быть пустым' })
  @IsString({ message: 'Поле пароль должно быть строкой' })
  @Length(6, 20, { message: 'Пароль должен содержать от 6 до 20 символов' })
  @Matches(/^(?=.*[.,!_])/, {
    message: 'Пароль должен содержать хотя бы один из спец. символов: .,!_',
  })
  password: string;
}
