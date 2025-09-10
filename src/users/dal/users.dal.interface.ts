import { User } from '../user.entity';

export interface IUsersDal {
  findAll(limit: number, offset: number): Promise<[User[], number]>;
}

export const USERS_DAL = Symbol('USERS_DAL');
