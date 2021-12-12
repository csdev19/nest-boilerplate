import { Module } from '@nestjs/common';
import { Account } from '../accounts/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountsService],
  exports: [AccountsService],
  controllers: [],
})
export class AccountModule {}