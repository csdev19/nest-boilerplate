import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../dtos/create-account.dto';
import encriptor from '../encrypt';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = new Account();
    account.firstName = createAccountDto.firstName;
    account.lastName = createAccountDto.lastName;
    account.email = createAccountDto.email;
    const hashedPassword = await encriptor.encrypt(createAccountDto.password);
    account.password = hashedPassword;

    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findOne(id: string): Promise<Account> {
    return this.accountRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<Account> {
    const [user] = await this.accountRepository.find({
      where: {
        username,
      },
    });
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.accountRepository.delete(id);
    return affected > 0;
  }
}
