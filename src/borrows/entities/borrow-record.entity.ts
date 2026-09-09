import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany ,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';
import { Fine } from '../../fines/entities/fine.entity';

export enum BorrowStatus {
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED',
}

@Entity('borrow_records')
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.borrowRecords, {
    onDelete: 'CASCADE',
  })
  member: User;

  @ManyToOne(() => Book, (book) => book.borrowRecords, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @OneToMany(
  () => Fine,
  (fine) => fine.borrowRecord,
)
   fines: Fine[];

  @CreateDateColumn()
  borrowedAt: Date;

  @Column()
  dueDate: Date;

  @Column({
    nullable: true,
  })
  returnedAt: Date;

  @Column({
    type: 'enum',
    enum: BorrowStatus,
    default: BorrowStatus.BORROWED,
  })
  status: BorrowStatus;
}
