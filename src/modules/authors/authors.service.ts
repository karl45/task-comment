import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  async getAuthor(authorize: {
    login: string;
    password: string;
  }): Promise<Author | null> {
    const author = await this.authorRepo.findOneBy({ login: authorize.login });
    if (!author) return null;
    const checkPassword = await bcrypt.compare(
      authorize.password,
      author.password,
    );

    if (!checkPassword) return null;

    return author;
  }
}
