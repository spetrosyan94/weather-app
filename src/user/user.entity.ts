import { ApiProperty } from '@nestjs/swagger';
// import { Roles } from 'src/roles/roles.entity';
import { Weather } from 'src/weather/weather.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinTable,
  // ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Superman', description: 'Логин пользователя' })
  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  login: string;

  @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
  @Column()
  password: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО пользователя',
  })
  @Column()
  fio: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Уникальный токен пользователя',
  })
  @Column({ unique: true })
  apiToken: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'Дата создания пользователя',
  })
  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0, // Указываем точность без секунд
  })
  createdAt: Date;

  // @ManyToMany(() => Roles, (roles) => roles.users)
  // @JoinTable()
  // roles: Roles[];

  @OneToMany(() => Weather, (weather) => weather.user_id)
  weather: Weather[];
}
