import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateComment {
  @IsString()
  @MaxLength(1000, { message: 'Text length is out from range[1-1000]' })
  @ApiProperty({ example: 'dwqdwqdqw' })
  text: string;
}
