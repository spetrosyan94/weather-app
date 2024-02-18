import {
  Controller,
  Body,
  Post,
  UseGuards,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherRequestDto } from './dto/weather.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Погода')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Получить погоду' })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос',
    schema: {
      example: {
        Погода: -11,
        Город: 'Тюмень',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка в запросе погоды. Повторите попытку позже',
    schema: {
      example: {
        statusCode: 400,
        message: 'Ошибка в запросе погоды. Повторите попытку позже',
      },
    },
  })
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
  @ApiResponse({
    status: 404,
    description: 'Город не найден',
    schema: {
      example: {
        message: 'Город не найден',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  // @UsePipes(new ValidationPipe())
  // Получаем данные о погоде с внешнего Api
  async getWeather(@Body() weatherRequestDto: WeatherRequestDto): Promise<any> {
    const response = await this.weatherService.getWeather(weatherRequestDto);

    return {
      Погода: response?.current?.temp_c,
      Город: response?.location?.name,
    };
  }
}
