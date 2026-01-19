import { DataSource } from 'typeorm';
import { Author } from '../modules/authors/entities/author.entity';
import { Task } from '../modules/tasks/entities/task.entity';
import { Comment } from '../modules/comments/entities/comment.entity';
export const AppDataSource = new DataSource({
  type: 'postgres', // тип базы данных
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'test_comments',
  entities: [Author, Task, Comment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
