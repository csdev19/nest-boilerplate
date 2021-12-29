import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../authentication/authentication.module';
import { Note } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './services/notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), AuthenticationModule],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
