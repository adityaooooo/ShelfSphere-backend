import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository:
      Repository<Category>,
  ) {}

  async create(
    body: CreateCategoryDto,
  ) {
    const existingCategory =
      await this.categoryRepository.findOne({
        where: {
          name: body.name,
        },
      });

    if (existingCategory) {
      throw new BadRequestException(
        'Category already exists',
      );
    }

    const category =
      this.categoryRepository.create(
        body,
      );

    return this.categoryRepository.save(
      category,
    );
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category =
      await this.categoryRepository.findOne({
        where: { id },
      });

    if (!category) {
      throw new NotFoundException(
        'Category not found',
      );
    }

    Object.assign(
      category,
      updateCategoryDto,
    );

    return this.categoryRepository.save(
      category,
    );
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.categoryRepository.delete(
      id,
    );

    return {
      message:
        'Category deleted successfully',
    };
  }
}