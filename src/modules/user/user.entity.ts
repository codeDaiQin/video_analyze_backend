import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  password?: string;

  @Column({ type: 'uuid', name: 'uid' })
  uid: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
    default: 0,
  })
  exp: number;
}
