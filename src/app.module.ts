import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './modules/notes/notes.module';
import { Account } from './modules/accounts/entities/account.entity';
import { Note } from './modules/notes/entities/note.entity';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_DB_HOST,
      port: +process.env.PG_DB_PORT,
      username: process.env.PG_DB_USERNAME,
      password: process.env.PG_DB_PASSWORD,
      database: process.env.PG_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Account, Note],
    }),
    AuthenticationModule,
    NotesModule,
  ],
})
export class AppModule {}
