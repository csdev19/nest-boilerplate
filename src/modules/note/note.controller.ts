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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiTags('Notes')
  @ApiBearerAuth('access-token')
  create(@Body() noteDto: CreateNoteDto) {
    return this.noteService.create(noteDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @ApiTags('Notes')
  @ApiBearerAuth('access-token')
  findAll() {
    return this.noteService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  @ApiTags('Notes')
  @ApiBearerAuth('access-token')
  findById(@Param('id') id: string) {
    return this.noteService.findById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  @ApiTags('Notes')
  @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() noteDto: UpdateNoteDto) {
    return this.noteService.update(id, noteDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  @ApiTags('Notes')
  @ApiBearerAuth('access-token')
  delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }
}
