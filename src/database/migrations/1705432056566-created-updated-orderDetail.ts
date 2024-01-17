import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedUpdatedOrderDetail1705432056566 implements MigrationInterface {
    name = 'CreatedUpdatedOrderDetail1705432056566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "createdat" datetime2 NOT NULL CONSTRAINT "DF_f3b0b40fe801035ed4e56a8dee3" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "updatedat" datetime2 NOT NULL CONSTRAINT "DF_566c0b8fd00c50a5617b847d996" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "DF_566c0b8fd00c50a5617b847d996"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "updatedat"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "DF_f3b0b40fe801035ed4e56a8dee3"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "createdat"`);
    }

}
