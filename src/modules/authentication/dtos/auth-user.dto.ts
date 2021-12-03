import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
