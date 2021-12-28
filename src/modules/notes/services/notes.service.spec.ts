import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  // let repository: Repository<Note>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.PG_DB_HOST,
          port: +process.env.PG_DB_PORT,
          username: process.env.PG_DB_USERNAME,
          password: process.env.PG_DB_PASSWORD,
          database: process.env.PG_DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
          entities: [Note],
        }),
        TypeOrmModule.forFeature([Note]),
      ],
      providers: [NotesService],
    }).compile();
    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
