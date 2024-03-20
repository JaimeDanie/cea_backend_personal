import { MigrationInterface, QueryRunner } from "typeorm";

export class Turnoinorden1710969640468 implements MigrationInterface {
    name = 'Turnoinorden1710969640468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "turno" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_df4bcc51852f1cfc81a6a0c8ac8" FOREIGN KEY ("turno") REFERENCES "turno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_df4bcc51852f1cfc81a6a0c8ac8"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "turno"`);
    }

}
