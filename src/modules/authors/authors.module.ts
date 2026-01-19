import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
@Module({
  imports: [
    JwtModule.register({
      secret: 'user_id',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Author]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService, JwtStrategy],
})
export class AuthorsModule {}
