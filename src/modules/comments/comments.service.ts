import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateComment } from './dto/create-comment.dto';
import { UpdateComment } from './dto/update-comment.dto';
import { Author } from '../authors/entities/author.entity';
import { Task } from 'modules/tasks/entities/task.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(Author)
    private authorsRepo: Repository<Author>,

    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  async create(postComment: CreateComment, author_id: string) {
    const author = await this.authorsRepo.findOneBy({ id: author_id });
    if (!author) throw new NotFoundException('Author not found');

    const task = await this.tasksRepo.findOneBy({ id: postComment.task_id });
    if (!task) throw new NotFoundException('Author not found');

    const comment = this.commentRepo.create({
      text: postComment.text,
      author,
      task,
    });
    this.commentRepo.create(comment);

    return await this.commentRepo.save(comment); // ✅ save to DB and return
  }

  async getByTaskId(task_id: string) {
    const task = await this.tasksRepo.findOneBy({ id: task_id });
    if (!task) throw new NotFoundException('Author not found');
    return this.commentRepo.find({ where: { task: task } });
  }

  getById(id: string) {
    return this.commentRepo.findOneBy({ id: id });
  }

  async updateById(id: string, comment: UpdateComment) {
    const oldComment = this.commentRepo.findOneBy({ id: id });

    if (!oldComment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    Object.assign(oldComment, comment);
    return this.commentRepo.save(comment);
  }

  async deleteById(id: string) {
    await this.commentRepo.delete({ id: id });
    return { message: `Comment with id ${id} succesfully deletd` };
  }
}
