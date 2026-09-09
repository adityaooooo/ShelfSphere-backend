import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';
import { BookQueryDto } from './dto/book-query.dto';
import {
  In,
  Repository,
} from 'typeorm';

import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';

import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createBookDto: CreateBookDto,
  ) {
    const categories =
      await this.categoryRepository.find({
        where: {
          id: In(
            createBookDto.categoryIds,
          ),
        },
      });

    const book =
      this.bookRepository.create({
        isbn: createBookDto.isbn,
        title: createBookDto.title,
        author: createBookDto.author,
        description:
          createBookDto.description,

        totalCopies:
          createBookDto.totalCopies,

        availableCopies:
          createBookDto.totalCopies,

        categories,
      });

    return this.bookRepository.save(
      book,
    );
  }

  async findAll(query: BookQueryDto) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const [books, total] =
    await this.bookRepository.findAndCount({
      where: query.search
        ? [
            {
              title: ILike(
                `%${query.search}%`,
              ),
            },
            {
              author: ILike(
                `%${query.search}%`,
              ),
            },
          ]
        : {},

      skip: (page - 1) * limit,

      take: limit,

      relations: {
        categories: true,
      },
    });

  return {
    total,
    page,
    limit,
    data: books,
  };
}

  async findOne(id: number) {
    const book =
      await this.bookRepository.findOne({
        where: { id },
      });

    if (!book) {
      throw new NotFoundException(
        'Book not found',
      );
    }

    return book;
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.bookRepository.delete(
      id,
    );

    return {
      message:
        'Book deleted successfully',
    };
  }
}
