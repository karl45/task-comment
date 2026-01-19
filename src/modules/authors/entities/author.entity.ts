import { Comment } from 'modules/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 8, unique: true })
  login: string;

  @Column({ type: 'varchar'})
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
