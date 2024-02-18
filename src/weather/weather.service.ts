import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WeatherRequestDto } from './dto/weather.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './weather.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather) private weatherRepository: Repository<Weather>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getWeather(requestData: WeatherRequestDto): Promise<any> {
    const baseUrl = this.configService.get<string>('WEATHER_API_URL');
    const apiKeyWeather = this.configService.get<string>('WEATHER_API_KEY');
    const langParam = requestData.language || 'ru';

    const apiUrl = `${baseUrl}/current.json?key=${apiKeyWeather}&lang=${langParam}&aqi=no&q=${requestData.city}`;

    // Найти пользователяв БД по apiToken
    const user = await this.userRepository.findOne({
      where: { apiToken: requestData.apiToken },
    });

    // Проверка, если пользователь не найден, выбрасываем исключение
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    try {
      // Получаем данные о погоде с внешнего Api
      const weatherResponse = await firstValueFrom(
        this.httpService.get(apiUrl),
      );

      // Сохраняем данные о погоде и пользователе в БД
      await this.weatherRepository.save({
        user_id: { id: user.id },
        request_result: weatherResponse?.status,
        temp_c: weatherResponse?.data.current?.temp_c,
      });

      return weatherResponse.data;
    } catch (err) {
      // Если это не ошибка "город не найден", продолжаем работу кода дальше и обрабатываем ответ от API
      await this.weatherRepository.save({
        user_id: { id: user.id },
        request_result: err.response?.status,
        temp_c: null,
      });

      if (err.response?.data?.error?.code === 1006) {
        // Выбрасываем исключение, если город не найден
        throw new NotFoundException('Город не найден');
      }

      // Выбрасываем исключение, если произошла ошибка в запросе погоды со стороны внешнего API
      throw new HttpException(
        'Ошибка в запросе погоды. Повторите попытку позже',
        err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
