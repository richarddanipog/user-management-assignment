import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { IUsersDal } from './users.dal.interface';

@Injectable()
export class UsersDal implements IUsersDal {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(limit: number, offset: number): Promise<[User[], number]> {
    return this.usersRepo.findAndCount({
      skip: offset,
      take: limit,
    });
  }
}
