import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupMember } from '../groups/entities/group-member.entity';

export type UserStatus = 'pending' | 'active' | 'blocked';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'active', 'blocked'],
    default: 'pending',
  })
  status: UserStatus;

  @OneToMany(() => GroupMember, (gm) => gm.user)
  memberships: GroupMember[];
}
