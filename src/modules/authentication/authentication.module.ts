import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { jwtConstants } from './constants/jwt';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './services/account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  providers: [
    AuthenticationService,
    AccountService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
  ],
  exports: [AuthenticationService, AccountService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
