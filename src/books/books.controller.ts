import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  BooksService,
  type UploadedBookImage,
} from './books.service';

import { CreateBookDto } from './dto/create-book.dto';
import { BookQueryDto } from './dto/book-query.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/entities/user.entity';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
  )
  create(
    @Body()
    createBookDto: CreateBookDto,
  ) {
    return this.booksService.create(
      createBookDto,
    );
  }


  @Post(':id/image')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles(
  UserRole.ADMIN,
  UserRole.LIBRARIAN,
)
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/books',
      filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop();
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
        callback(null, filename);
      },
    }),
  }),
)
uploadImage(
  @Param('id') id: string,
  @UploadedFile() file: UploadedBookImage,
) {
  return this.booksService.uploadImage(
    Number(id),
    file,
  );
}



  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query()
    query: BookQueryDto,
  ) {
    return this.booksService.findAll(
      query,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.booksService.findOne(
      Number(id),
    );
  }

  @Patch(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
  )
  update(
    @Param('id')
    id: string,

    @Body()
    updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(
      Number(id),
      updateBookDto,
    );
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
  )
  remove(
    @Param('id')
    id: string,
  ) {
    return this.booksService.remove(
      Number(id),
    );
  }
}
