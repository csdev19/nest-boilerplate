import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAccount } from '../interfaces/account.interface';

@Entity()
export class Account implements IAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;
}
