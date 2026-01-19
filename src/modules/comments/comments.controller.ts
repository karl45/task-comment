import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,Request  } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateComment } from './dto/create-comment.dto';
import { UpdateComment } from './dto/update-comment.dto';
import { JwtAuthGuard } from './auth/JwtAuthGuard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() request, @Body() comment: CreateComment) {
    const authorId = request.user.id;
    return this.commentsService.create(comment, authorId);
  }

  @Get(':task_id')
  getByTaskId(@Param('task_id') task_id: string) {
    return this.commentsService.getByTaskId(task_id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.commentsService.getById(id);
  }

  @Patch(':id')
  async updateCommentById(@Param('id') id: string, @Body() comment: UpdateComment) {
    return this.commentsService.updateById(id, comment);
  }

  @Delete(':id')
  async deleteCommentById(@Param('id') id:string){
    return this.commentsService.deleteById(id);
  }
}
