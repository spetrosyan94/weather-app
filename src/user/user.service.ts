import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
// import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly rolesService: RolesService,
  ) {}

  // Поиск всех пользователей
  getAllUsers() {
    return this.userRepository.find();
  }

  // Создание пользователя
  async createUser(dto: UserCreateDto) {
    const user = await this.userRepository.save(dto);

    // Создание ролей пользователей по умолчанию
    // const role = await this.rolesService.getRoleByValue('USER');
    // Предполагая, что user является экземпляром модели User, а role - экземпляром модели Role
    // user.roles = [role];
    return user;
  }

  // Поиск пользователя по логину
  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      // relations: ['roles'],
    });

    // Проверка, существует ли пользователь
    if (!user?.login) {
      return false;
    }
    return user;
  }

  // Добавление токена при создании пользователя в БД
  async addApiTokenUser(user: User, apiToken: string) {
    user.apiToken = apiToken;
    return await this.userRepository.save(user);
  }
}
