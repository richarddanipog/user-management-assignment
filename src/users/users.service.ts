import { Inject, Injectable } from '@nestjs/common';
import { USERS_DAL } from './dal/users.dal.interface';
import type { IUsersDal } from './dal/users.dal.interface';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_DAL) private readonly usersDal: IUsersDal) {}

  async findAll(limit: number, offset: number) {
    const [data, total] = await this.usersDal.findAll(limit, offset);
    return { data, total, limit, offset };
  }
}
