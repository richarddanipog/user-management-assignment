import { Inject, Injectable } from '@nestjs/common';
import type { IGroupsDal } from './dal/groups.dal.interface';
import { GROUPS_DAL } from './dal/groups.dal.interface';

@Injectable()
export class GroupsService {
  constructor(@Inject(GROUPS_DAL) private readonly groupsDal: IGroupsDal) {}

  async findAll(limit: number, offset: number) {
    const [data, total] = await this.groupsDal.findAll(limit, offset);
    return { data, total, limit, offset };
  }

  async removeUserFromGroup(groupId: number, userId: number) {
    return this.groupsDal.removeUserFromGroup(groupId, userId);
  }

  async findMembers(groupId: number) {
    return this.groupsDal.findMembers(groupId);
  }
}
