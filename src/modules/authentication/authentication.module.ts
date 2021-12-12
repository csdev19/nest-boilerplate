import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { jwtConstants } from './constants/jwt';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountModule } from '../accounts/accounts.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    AccountModule,
  ],
  providers: [
    AuthenticationService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
  ],
  exports: [AuthenticationService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
