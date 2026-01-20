import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateComment {
  @IsString()
  @MaxLength(1000, { message: 'Text length is out from range[1-1000]' })
  @ApiProperty({ example: 'asdadasdsa' })
  text: string;

  @IsString()
  @ApiProperty({ example: '10bfa683-869d-4663-a8da-5fc9a59f2195' })
  task_id: string;
}
