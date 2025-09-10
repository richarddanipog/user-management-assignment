import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('groups')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  getGroups(@Query() q: PaginationDto) {
    return this.groupsService.findAll(q.limit, q.offset);
  }

  @Delete(':groupId/users/:userId')
  removeMember(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.groupsService.removeUserFromGroup(groupId, userId);
  }

  @Get(':groupId/users')
  getUsersFromGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupsService.findMembers(groupId);
  }
}
