import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';

import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { FinesModule } from './fines/fines.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        type: 'postgres',

        host: configService.get<string>(
          'DB_HOST',
          'localhost',
        ),

        port: configService.get<number>(
          'DB_PORT',
          5432,
        ),

        username: configService.get<string>(
          'DB_USERNAME',
          'postgres',
        ),

        password: configService.get<string>(
          'DB_PASSWORD',
          '',
        ),

        database: configService.get<string>(
          'DB_NAME',
          'shelfsphere',
        ),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),

    UsersModule,

    CategoriesModule,

    BooksModule,

    BorrowsModule,

    AuthModule,

    ReservationsModule,

    FinesModule,
     
    DashboardModule,

    MailModule,

    ReportsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}