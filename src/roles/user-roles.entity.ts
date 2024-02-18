import { User } from 'src/user/user.entity';
import { JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Roles } from './roles.entity';
import { Exclude } from 'class-transformer';

// @Entity({ name: 'user_roles' })
// Используем @Exclude, чтобы временно исключить сущность UserRoles
@Exclude()
export class UserRoles {
  @PrimaryColumn()
  roleId: number; // Или тот тип данных, который вы используете для идентификации Roles

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'roleId' })
  role: Roles;

  @PrimaryColumn()
  userId: number; // Или тот тип данных, который вы используете для идентификации User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
