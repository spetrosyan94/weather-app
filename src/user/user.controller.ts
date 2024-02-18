import {
  // Body,
  // UsePipes,
  // ValidationPipe,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUserDto } from './dto/user-get.dto';
// import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiBody({ type: GetUserDto })
  @ApiResponse({ status: 200, type: [User] })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
    schema: {
      example: {
        message: 'Пользователь не авторизован',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  // @ApiOperation({ summary: 'Создание пользователя' })
  // @ApiResponse({ status: 200, type: User })
  // @Post()
  // // @UsePipes(new ValidationPipe())
  // async createUser(@Body() userDto: UserCreateDto) {
  //   return this.userService.createUser(userDto);
  // }
}
