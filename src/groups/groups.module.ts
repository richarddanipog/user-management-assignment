import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { UserGroups } from './entities/group-member.entity';
import { GROUPS_DAL } from './dal/groups.dal.interface';
import { GroupsDal } from './dal/groups.dal';

@Module({
  imports: [TypeOrmModule.forFeature([Group, UserGroups])],
  providers: [GroupsService, { provide: GROUPS_DAL, useClass: GroupsDal }],
  controllers: [GroupsController],
})
export class GroupsModule {}
