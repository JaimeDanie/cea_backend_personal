import { MigrationInterface, QueryRunner } from "typeorm";

export class Relations1704966824126 implements MigrationInterface {
    name = 'Relations1704966824126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "order" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD CONSTRAINT "FK_3cf4f8a130dcd9109f6afccb34b" FOREIGN KEY ("order") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "FK_3cf4f8a130dcd9109f6afccb34b"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "order"`);
    }

}
