import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../authentication/authentication.module';
import { NoteController } from './note.controller';
import { Note } from './note.entity';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), AuthModule],
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {}
