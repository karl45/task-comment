import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Authorize {
  @IsString()
  @ApiProperty({ example: 'lorem' })
  login: string;
  @IsString()
  @ApiProperty({ example: '123' })
  password: string;
}
