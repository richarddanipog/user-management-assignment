import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Group } from '../entities/group.entity';
import { UserGroups } from '../entities/group-member.entity';
import { IGroupsDal } from './groups.dal.interface';
import { GroupStatus } from 'src/common/GroupStatus.enum';

@Injectable()
export class GroupsDal implements IGroupsDal {
  constructor(
    @InjectRepository(Group) private readonly groupsRepo: Repository<Group>,
    @InjectRepository(UserGroups)
    private readonly ugRepo: Repository<UserGroups>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(limit: number, offset: number) {
    return this.groupsRepo.findAndCount({ skip: offset, take: limit });
  }

  async removeUserFromGroup(groupId: number, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const memberGroup = await queryRunner.manager.find(UserGroups, {
        where: { groupId, userId },
      });

      if (!memberGroup.length) {
        throw new NotFoundException('This user not in the group.');
      }

      await queryRunner.manager.delete(UserGroups, { groupId, userId });

      const UserGroupsCount = await queryRunner.manager.count(UserGroups, {
        where: { groupId },
      });

      const updatedStatus =
        UserGroupsCount === 0 ? GroupStatus.EMPTY : GroupStatus.EMPTY;
      await queryRunner.manager.update(
        Group,
        { id: groupId },
        {
          status: updatedStatus,
        },
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findMembers(groupId: number) {
    const group = await this.groupsRepo.findOne({
      where: { id: groupId },
      relations: ['members', 'members.user'],
    });
    if (!group) throw new NotFoundException(`Group ${groupId} not found`);

    return {
      groupId: group.id,
      groupName: group.name,
      members: group.members.map((m) => ({
        id: m.user.id,
        name: m.user.name,
        email: m.user.email,
      })),
    };
  }
}
