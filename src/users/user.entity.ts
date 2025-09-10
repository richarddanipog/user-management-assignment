import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserGroups } from '../groups/entities/group-member.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UserGroups, (gm) => gm.user)
  memberships: UserGroups[];
}
