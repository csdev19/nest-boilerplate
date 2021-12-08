import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { SignupDto } from './dtos/signup.dto';
import { AccountService } from './services/account.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
  ) {}

  @Public()
  @ApiTags('Authentication')
  @Post('login')
  async login(@Body() login: LoginDto) {
    console.log('req', login);
    return this.authenticationService.login({
      password: login.password,
      username: login.username,
    });
  }

  @Public()
  @ApiTags('Authentication')
  @Post('signup')
  async signup(@Body() signup: SignupDto) {
    console.log('req', signup);
    return this.accountService.create({ ...signup });
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiTags('Authentication')
  @Get('profile')
  @ApiBearerAuth('access-token')
  getProfile(@Request() req): any {
    return req.user;
  }
}
