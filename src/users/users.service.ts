import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entities';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly usersModel: Model<Users>) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.usersModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const user = await this.usersModel.findOne({ _id: id }).exec();
    // if (!user) throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = new this.usersModel(createUserDto);
    return user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }
}
