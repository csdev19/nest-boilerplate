import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() noteDto: CreateNoteDto) {
    return this.noteService.create(noteDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    console.log('hola');
    return this.noteService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.noteService.findById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() noteDto: UpdateNoteDto) {
    return this.noteService.update(id, noteDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }
}
