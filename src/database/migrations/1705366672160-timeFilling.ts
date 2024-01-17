import { MigrationInterface, QueryRunner } from "typeorm";

export class TimeFilling1705366672160 implements MigrationInterface {
    name = 'TimeFilling1705366672160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "DF_8e24a60827039eb2bf86a109da6"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "datefilling"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "datefilling" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "datefilling"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "datefilling" datetime2 NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD CONSTRAINT "DF_8e24a60827039eb2bf86a109da6" DEFAULT getdate() FOR "datefilling"`);
    }

}
