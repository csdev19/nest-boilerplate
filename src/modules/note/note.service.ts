import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../authentication/entities/account.entity';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  findAll() {
    return this.notesRepository.find();
  }

  findById(id: string) {
    return this.notesRepository.findOne(id);
  }

  create(noteDto: CreateNoteDto, account: Account) {
    const note = new Note();
    note.title = noteDto.title;
    note.content = noteDto.content;
    note.account = account;
    return this.notesRepository.save(note);
  }

  update(id, noteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, { ...noteDto });
  }

  async delete(id: string) {
    const { affected } = await this.notesRepository.delete(id);
    return affected > 0;
  }
}
