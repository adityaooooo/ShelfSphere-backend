import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Book } from '../../books/entities/book.entity';


@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
