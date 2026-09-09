import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { BorrowRecord } from '../../borrows/entities/borrow-record.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

export enum UserRole {
  MEMBER = 'MEMBER',
  LIBRARIAN = 'LIBRARIAN',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
    unique: true,
  })
  memberId: string;

  @Column({
    nullable: true,
    unique: true,
  })
  staffId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @OneToMany(() => BorrowRecord, (borrowRecord) => borrowRecord.member)
  borrowRecords: BorrowRecord[];
  @OneToMany(
  () => Reservation,
  (reservation) => reservation.member,
)
   reservations: Reservation[];
}
