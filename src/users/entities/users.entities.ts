import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('json', { nullable: true })
  hobby: string[];
}
