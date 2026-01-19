import { Body, Controller, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { JwtService } from '@nestjs/jwt';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async loginbyAuthor(@Body() authorize: { login: string; password: string }) {
    const author = await this.authorsService.getAuthor(authorize);
    if (!author) {
      return { message: 'Invalid login or password' };
    }

    const payload = { sub: author.id, login: author.login };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  @Post('logout')
  async logout() {
    localStorage.removeItem('access_token');
  }
}
