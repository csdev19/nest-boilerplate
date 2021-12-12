import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account } from '../accounts/entities/account.entity';
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
  @ApiResponse({ status: 200, description: 'Successful create' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  create(@Body() noteDto: CreateNoteDto, @Request() request) {
    const account: Account = request.user;
    return this.noteService.create(noteDto, account);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @ApiTags('Notes')
  @ApiResponse({ status: 200, description: 'Successful find all' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  async findAll() {
    return this.noteService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  @ApiTags('Notes')
  @ApiResponse({ status: 200, description: 'Successful find by id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  findById(@Param('id') id: string) {
    return this.noteService.findById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  @ApiTags('Notes')
  @ApiResponse({ status: 200, description: 'Successful create' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() noteDto: UpdateNoteDto) {
    return this.noteService.update(id, noteDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  @ApiTags('Notes')
  @ApiResponse({ status: 200, description: 'Successful delete' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }
}
