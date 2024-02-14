import { MigrationInterface, QueryRunner } from "typeorm";

export class DecimalOrderDetail1707941133435 implements MigrationInterface {
    name = 'DecimalOrderDetail1707941133435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "weight" decimal(7,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "weight" int`);
    }

}
