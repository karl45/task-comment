import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'modules/tasks/tasks.module';
import { AuthorsModule } from 'modules/authors/authors.module';
import { CommentsModule } from 'modules/comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'modules/authors/entities/author.entity';
import { Task } from 'modules/tasks/entities/task.entity';
import { Comment } from 'modules/comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'test_comments',
      entities: [Comment,Author,Task], // 🔑 сохраняет соединение при рестарте приложения
      synchronize: false,
      retryAttempts: 5, // количество попыток переподключения
      retryDelay: 3000,
    }),
    TasksModule,
    AuthorsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
