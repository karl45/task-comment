import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateComment } from './dto/create-comment.dto';
import { UpdateComment } from './dto/update-comment.dto';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('bearer')
  create(@Request() request, @Body() comment: CreateComment) {
    const authorId = request.user.id;
    return this.commentsService.create(comment, authorId);
  }

  @Get()
  getByTaskId(@Query('task_id') task_id: string) {
    return this.commentsService.getByTaskId(task_id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.commentsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @Patch(':id')
  async updateCommentById(
    @Request() request,
    @Param('id') id: string,
    @Body() comment: UpdateComment,
  ) {
    const authorId = request.user.id;
    return this.commentsService.updateById(id, authorId, comment);
  }

  @Delete(':id')
  async deleteCommentById(@Param('id') id: string) {
    return this.commentsService.deleteById(id);
  }
}
