import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mailHost =
          configService.get<string>('MAIL_HOST') ||
          process.env.MAIL_HOST ||
          'smtp.gmail.com';
        const mailPort = Number(
          configService.get<string>('MAIL_PORT') ||
            process.env.MAIL_PORT ||
            '587',
        );
        const mailSecure =
          configService.get<string>('MAIL_SECURE') === 'true' ||
          process.env.MAIL_SECURE === 'true' ||
          false;

        return {
          transport: {
            host: mailHost,
            port: mailPort,
            secure: mailSecure,
            auth: {
              user:
                configService.get<string>('MAIL_USER') ||
                process.env.MAIL_USER,
              pass:
                configService.get<string>('MAIL_PASS') ||
                process.env.MAIL_PASS,
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from:
              configService.get<string>('MAIL_FROM') ||
              process.env.MAIL_FROM ||
              '"ShelfSphere" <noreply@shelfsphere.com>',
          },
        };
      },
    }),
  ],

  providers: [MailService],

  exports: [MailService],
})
export class MailModule {}