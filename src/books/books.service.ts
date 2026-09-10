import {
  BadRequestException,
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
import { UpdateBookDto } from './dto/update-book.dto';

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

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(
        'Book not found',
      );
    }

    if (updateBookDto.categoryIds) {
      book.categories = await this.categoryRepository.find({
        where: {
          id: In(updateBookDto.categoryIds),
        },
      });
    }

    if (updateBookDto.totalCopies !== undefined) {
      const borrowedCopies =
        book.totalCopies - book.availableCopies;

      if (updateBookDto.totalCopies < borrowedCopies) {
        throw new BadRequestException(
          'Total copies cannot be less than borrowed copies',
        );
      }

      book.totalCopies = updateBookDto.totalCopies;
      book.availableCopies =
        updateBookDto.totalCopies - borrowedCopies;
    }

    if (updateBookDto.isbn !== undefined) {
      book.isbn = updateBookDto.isbn;
    }

    if (updateBookDto.title !== undefined) {
      book.title = updateBookDto.title;
    }

    if (updateBookDto.author !== undefined) {
      book.author = updateBookDto.author;
    }

    if (updateBookDto.description !== undefined) {
      book.description = updateBookDto.description;
    }

    return this.bookRepository.save(book);
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



  async uploadImage(
  id: number,
  file: Express.Multer.File,
) {
  const book = await this.bookRepository.findOne({
    where: { id },
  });

  if (!book) {
    throw new NotFoundException('Book not found');
  }

  if (!file) {
    throw new BadRequestException('Image file is required');
  }

  book.imageUrl = `/uploads/books/${file.filename}`;

  return this.bookRepository.save(book);
}
}
