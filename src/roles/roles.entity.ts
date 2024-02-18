import { ApiProperty } from '@nestjs/swagger';
// import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  // JoinTable,
  // ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Roles {
  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Роль пользователя',
  })
  @Column({ unique: true })
  value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли пользователя',
  })
  @Column()
  description: string;

  // Добавляем обратное отношение ManyToMany с User
  // @ManyToMany(() => User, (user) => user.roles)
  // @JoinTable()
  // users: User[];

  // Добавляем отношение OneToMany с UserRoles
  // @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
  // userRoles: UserRoles[];
}
