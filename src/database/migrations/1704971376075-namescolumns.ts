import { MigrationInterface, QueryRunner } from "typeorm";

export class Namescolumns1704971376075 implements MigrationInterface {
    name = 'Namescolumns1704971376075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.orderdetail.dateFilling", "datefilling"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "datefilling"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "datefilling" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "datefilling"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "datefilling" nvarchar(255) NOT NULL`);
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.orderdetail.datefilling", "dateFilling"`);
    }

}
