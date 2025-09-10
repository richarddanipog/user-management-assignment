import { Group } from '../entities/group.entity';

export interface IGroupsDal {
  findAll(limit: number, offset: number): Promise<[Group[], number]>;
  removeUserFromGroup(groupId: number, userId: number): Promise<void>;
  findMembers(groupId: number): Promise<{
    groupId: number;
    groupName: string;
    members: { id: number; name: string; email: string }[];
  }>;
}

export const GROUPS_DAL = Symbol('GROUPS_DAL');
