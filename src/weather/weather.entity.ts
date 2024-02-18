import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Weather {
  @ApiProperty({ example: '1', description: 'ID события' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @ManyToOne(() => User, (user) => user.weather)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @ApiProperty({ example: '2024-02-18 02:57:47', description: 'Время события' })
  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0, // Указываем точность без секунд
  })
  action_time: Date;

  @ApiProperty({ example: '200', description: 'Результат запроса' })
  @Column()
  request_result: number;

  @ApiProperty({ example: '+10', description: 'Температура в градусах' })
  @Column({ nullable: true })
  temp_c: number;
}
