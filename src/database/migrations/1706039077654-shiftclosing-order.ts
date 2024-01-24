import { MigrationInterface, QueryRunner } from "typeorm";

export class ShiftclosingOrder1706039077654 implements MigrationInterface {
    name = 'ShiftclosingOrder1706039077654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "shiftclosing" int NOT NULL CONSTRAINT "DF_e4e9ed2339ad48aba2dc602d718" DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "DF_e4e9ed2339ad48aba2dc602d718"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shiftclosing"`);
    }

}
