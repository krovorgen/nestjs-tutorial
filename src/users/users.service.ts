import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entities';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id: parseInt(id, 10) });

    // if (!user) throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(String(id));
    return this.usersRepository.remove(user);
  }
}
