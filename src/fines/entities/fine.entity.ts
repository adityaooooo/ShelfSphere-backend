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
}