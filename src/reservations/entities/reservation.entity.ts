<<<<<<< HEAD
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  member: User;

  @ManyToOne(() => Book, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @CreateDateColumn()
  reservedAt: Date;
=======
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  member: User;

  @ManyToOne(() => Book, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @CreateDateColumn()
  reservedAt: Date;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}