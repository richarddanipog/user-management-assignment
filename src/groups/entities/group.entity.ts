import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserGroups } from './group-member.entity';

export type GroupStatus = 'empty' | 'notEmpty';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['empty', 'notEmpty'], default: 'empty' })
  status: GroupStatus;

  @OneToMany(() => UserGroups, (gm) => gm.group)
  members: UserGroups[];
}
