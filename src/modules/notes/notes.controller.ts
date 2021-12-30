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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Account } from '../accounts/entities/account.entity';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { CreateNoteDto } from './dtos/create-note.dto';
import { FindNoteDto } from './dtos/find-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { NotesService } from './services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiTags('Notes')
  @ApiOperation({ summary: 'Create note enpoint' })
  @ApiResponse({ status: 200, description: 'Successful create' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  create(@Body() noteDto: CreateNoteDto, @Request() request) {
    const account: Account = request.user;
    return this.notesService.create(noteDto, account.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @ApiTags('Notes')
  @ApiOperation({ summary: 'Find all notes enpoint' })
  @ApiResponse({
    status: 200,
    description: 'Successful find all',
    type: FindNoteDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  async findAll() {
    return this.notesService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  @ApiTags('Notes')
  @ApiOperation({ summary: 'Find note by id enpoint' })
  @ApiResponse({
    status: 200,
    description: 'Successful find by id',
    type: FindNoteDto,
    isArray: false,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  findById(@Param('id') id: string) {
    return this.notesService.findById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  @ApiTags('Notes')
  @ApiOperation({ summary: 'Update note enpoint' })
  @ApiResponse({ status: 200, description: 'Successful create' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() noteDto: UpdateNoteDto) {
    return this.notesService.update(id, noteDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  @ApiTags('Notes')
  @ApiOperation({ summary: 'Delete note enpoint' })
  @ApiResponse({ status: 200, description: 'Successful delete' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
