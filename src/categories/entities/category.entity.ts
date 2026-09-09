<<<<<<< HEAD
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
=======
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
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
