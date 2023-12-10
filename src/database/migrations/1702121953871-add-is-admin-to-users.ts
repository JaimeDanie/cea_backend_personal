import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAdminToUsers1702121953871 implements MigrationInterface {
    name = 'AddIsAdminToUsers1702121953871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" bit NOT NULL CONSTRAINT "DF_1e9ca59226e3cad7bbb10e7c00e" DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_1e9ca59226e3cad7bbb10e7c00e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
