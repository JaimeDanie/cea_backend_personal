import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToUsers1702074093592 implements MigrationInterface {
    name = 'AddIsActiveToUsers1702074093592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" bit NOT NULL CONSTRAINT "DF_409a0298fdd86a6495e23c25c66" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_409a0298fdd86a6495e23c25c66"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }

}
