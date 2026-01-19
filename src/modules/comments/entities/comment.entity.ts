import { Author } from 'modules/authors/entities/author.entity';
import { Task } from 'modules/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task, (task) => task.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: Task;


  @ManyToOne(() => Author, (author) => author.comments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @Column({ type: 'varchar', length: 1000 })
  text: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
