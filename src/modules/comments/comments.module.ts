import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from 'modules/tasks/entities/task.entity';
import { Author } from 'modules/authors/entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Author, Task]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
