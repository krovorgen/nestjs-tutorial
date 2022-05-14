import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entities';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: Users[] = [
    {
      id: 1,
      name: 'Maksim',
      age: 24,
      job: 'programmer',
      hobby: ['games', 'serials'],
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === +id);
    // if (!user) throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    this.users.push({ id: +new Date(), ...createUserDto });
    return createUserDto;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((item) => item.id === +id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === +id);
    if (index !== -1) {
      this.users.splice(index, 1);
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
