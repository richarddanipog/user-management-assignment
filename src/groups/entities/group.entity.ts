import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupMember } from './group-member.entity';

export type GroupStatus = 'empty' | 'notEmpty';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['empty', 'notEmpty'], default: 'empty' })
  status: GroupStatus;

  @OneToMany(() => GroupMember, (gm) => gm.group)
  members: GroupMember[];
}
