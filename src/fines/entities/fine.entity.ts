<<<<<<< HEAD
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { BorrowRecord } from '../../borrows/entities/borrow-record.entity';

@Entity('fines')
export class Fine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => BorrowRecord,
    {
      onDelete: 'CASCADE',
    },
  )
  borrowRecord: BorrowRecord;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({
    default: false,
  })
  paid: boolean;

  @CreateDateColumn()
  createdAt: Date;
=======
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { BorrowRecord } from '../../borrows/entities/borrow-record.entity';

@Entity('fines')
export class Fine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => BorrowRecord,
    {
      onDelete: 'CASCADE',
    },
  )
  borrowRecord: BorrowRecord;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({
    default: false,
  })
  paid: boolean;

  @CreateDateColumn()
  createdAt: Date;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}