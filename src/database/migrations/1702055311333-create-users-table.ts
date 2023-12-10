import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1702055311333 implements MigrationInterface {
    name = 'CreateUsersTable1702055311333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "currentToken" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "currentToken" nvarchar(255) NOT NULL`);
    }

}
