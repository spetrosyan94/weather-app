import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WeatherRequestDto {
  @ApiProperty({
    example: '1234567890',
    description: 'Уникальный токен пользователя',
  })
  // Валидация
  @IsNotEmpty({ message: 'Поле API токена пользователя не может быть пустым' })
  @IsString({ message: 'Поле API токена пользователя должно быть строкой' })
  apiToken: string;

  @ApiProperty({
    example: 'Тюмень',
    description: 'Город для запроса погоды',
  })
  // Валидация
  @IsNotEmpty({ message: 'Поле названия города не может быть пустым' })
  @IsString({ message: 'Поле названия города должно быть строкой' })
  city: string;

  @ApiProperty({
    example: 'ru',
    description: 'Выбор языка для формата ответа',
  })
  // Валидация
  @IsString({ message: 'Поле названия города должно быть строкой' })
  language?: string;
}
