import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({
    example: '1234567890',
    description: 'API Token пользователя',
    required: true,
  })
  readonly apiToken: string;
}
