import { MigrationInterface, QueryRunner } from "typeorm";

export class PrintOrderDetail1706035723053 implements MigrationInterface {
    name = 'PrintOrderDetail1706035723053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "print" int NOT NULL CONSTRAINT "DF_6ac3946e2d31f8bd2e4c21a4277" DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "DF_6ac3946e2d31f8bd2e4c21a4277"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "print"`);
    }

}
