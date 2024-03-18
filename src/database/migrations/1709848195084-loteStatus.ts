import { MigrationInterface, QueryRunner } from "typeorm";

export class LoteStatus1709848195084 implements MigrationInterface {
    name = 'LoteStatus1709848195084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lote" ADD "nonconformity" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "lote" ADD CONSTRAINT "FK_83fa3facb8907b7190e234a9854" FOREIGN KEY ("nonconformity") REFERENCES "nonconformity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lote" DROP CONSTRAINT "FK_83fa3facb8907b7190e234a9854"`);
        await queryRunner.query(`ALTER TABLE "lote" DROP COLUMN "nonconformity"`);
    }

}
