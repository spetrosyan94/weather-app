import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserLoginDto } from './user-login.dto';

export class UserCreateDto extends UserLoginDto {
  // ФИО
  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО пользователя',
  })
  //  Валидация
  @IsNotEmpty({ message: 'Поле fio не может быть пустым' })
  @IsString({ message: 'Поле fio должно быть строкой' })
  fio: string;
}
