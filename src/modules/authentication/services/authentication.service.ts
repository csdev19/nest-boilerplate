import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import encriptor from '../encrypt';
import { AccountService } from './account.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.accountService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log('password', password);
      return result;
    }
    return null;
  }

  async login({ username, password }: { username: string; password: string }) {
    const user = await this.accountService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatched = await encriptor.compare(password, user.password);

    if (!isMatched) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
