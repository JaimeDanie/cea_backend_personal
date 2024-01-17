import { MigrationInterface, QueryRunner } from "typeorm";

export class NumordertoorderCheck1705072400751 implements MigrationInterface {
    name = 'NumordertoorderCheck1705072400751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "numorder"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "numorder" int`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "numorder"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "numorder" int`);
    }

}
