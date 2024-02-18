import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WeatherModule } from './weather/weather.module';
import { UserModule } from './user/user.module';
// import { User } from './user/user.entity';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      // Формируем конфиг. файл в зависимости от режима работы приложения
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      // entities: [User],
      // Автозагрузка сущностей зарегистрированных с помощью forFeature()
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    RolesModule,
    AuthModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
