import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';
import { BorrowRecord } from '../../borrows/entities/borrow-record.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  isbn: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    default: 0,
  })
  totalCopies: number;

  @Column({
    default: 0,
  })
  availableCopies: number;

  @ManyToMany(() => Category, {
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(
    () => BorrowRecord,
    (borrowRecord) => borrowRecord.book,
  )
  borrowRecords: BorrowRecord[];
  @OneToMany(
  () => Reservation,
  (reservation) => reservation.book,
)
reservations: Reservation[];
}