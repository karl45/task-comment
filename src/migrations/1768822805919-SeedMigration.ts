import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

export class SeedMigration1768822805919 implements MigrationInterface {
  name = 'SeedMigration1768822805919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "task" (id, "taskName") VALUES
      ('${uuid()}', 'taskName1'),
      ('${uuid()}', 'taskName2'),
      ('${uuid()}', 'taskName3');`,
    );

    const password1 = await bcrypt.hash('password1', 10);
    const password2 = await bcrypt.hash('password2', 10);

    await queryRunner.query(
      `INSERT INTO "author" (id, "login", "password") VALUES ($1, $2, $3)`,
      [uuid(), 'author1', password1]
    );

    await queryRunner.query(
      `INSERT INTO "author" (id, "login", "password") VALUES ($1, $2, $3)`,
      [uuid(), 'author2', password2]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
