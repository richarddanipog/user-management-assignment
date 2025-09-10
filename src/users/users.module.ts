import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { USERS_DAL } from './dal/users.dal.interface';
import { UsersDal } from './dal/users.dal';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, { provide: USERS_DAL, useClass: UsersDal }],
  controllers: [UsersController],
})
export class UsersModule {}
