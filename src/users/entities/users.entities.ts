import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Hobby } from './hobby.entity';

@Entity('users') // sql  table = "users"
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  job: string;

  @JoinTable()
  @ManyToMany(() => Hobby, (hobby) => hobby.users)
  hobby: string[];
}
