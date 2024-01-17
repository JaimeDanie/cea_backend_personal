import { MigrationInterface, QueryRunner } from "typeorm";

export class Statusnovedad1705351088102 implements MigrationInterface {
    name = 'Statusnovedad1705351088102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "novedad" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "status_tambor" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "novedad_tambor" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD CONSTRAINT "DF_9659ae38e414dcab75a481a88ad" DEFAULT 0 FOR "numtambor"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "datefilling"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "datefilling" datetime2 NOT NULL CONSTRAINT "DF_8e24a60827039eb2bf86a109da6" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "DF_8e24a60827039eb2bf86a109da6"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "datefilling"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "datefilling" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "DF_9659ae38e414dcab75a481a88ad"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "novedad_tambor"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "status_tambor"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "novedad"`);
    }

}
